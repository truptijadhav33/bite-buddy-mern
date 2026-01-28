import { useAppSelector } from "../../app/hooks";

/**
 * Access the authenticated user's state and roles easily.
 */
export default function useAuth() {
    const { user, isAuthenticated, loading, role, error } = useAppSelector((state) => state.auth);

    return {
        user,
        isAuthenticated,
        isLoading: loading,
        role,
        error,
        isAdmin: role === "admin",
        isStaff: role === "staff",
        isCustomer: role === "customer",
    };
}
