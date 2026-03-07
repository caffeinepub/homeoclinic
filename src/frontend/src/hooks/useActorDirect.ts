import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { backendInterface } from "../backend";
import { createActorWithConfig } from "../config";
import { getSecretParameter } from "../utils/urlParams";
import { useInternetIdentity } from "./useInternetIdentity";

const ACTOR_DIRECT_QUERY_KEY = "actor-direct";

export function useActorDirect() {
  const { identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const principalStr = identity?.getPrincipal().toString() ?? "anonymous";

  const actorQuery = useQuery<backendInterface | null>({
    queryKey: [ACTOR_DIRECT_QUERY_KEY, principalStr],
    queryFn: async () => {
      if (!identity || identity.getPrincipal().isAnonymous()) {
        // Never create an anonymous actor — the backend rejects all anonymous calls
        return null;
      }

      // Create actor with the user's authenticated identity
      const actor = await createActorWithConfig({
        agentOptions: {
          identity,
        },
      });

      // Initialize access control (registers first user as admin in the canister)
      try {
        const adminToken = getSecretParameter("caffeineAdminToken") || "";
        await actor._initializeAccessControlWithSecret(adminToken);
      } catch {
        // Non-fatal: if already initialized, this may throw — ignore
      }

      return actor;
    },
    // Keep actor cached as long as the principal stays the same, but allow
    // explicit refetches to succeed (don't use Infinity which blocks refetches).
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
    enabled: true,
  });

  // When a real authenticated actor becomes available, invalidate and refetch
  // all dependent queries so they pick up the new actor immediately
  useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_DIRECT_QUERY_KEY);
        },
      });
      queryClient.refetchQueries({
        predicate: (query) => {
          return !query.queryKey.includes(ACTOR_DIRECT_QUERY_KEY);
        },
      });
    }
  }, [actorQuery.data, queryClient]);

  return {
    actor: actorQuery.data ?? null,
    isFetching: actorQuery.isFetching,
  };
}
