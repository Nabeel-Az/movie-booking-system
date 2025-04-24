import { createFileRoute, useRouter } from "@tanstack/react-router";
import { nanoid } from "nanoid";
import { useAuth } from "@/hooks/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { getListUsers } from "@/services/login-service";
import { UserProfile } from "@/models/stores/authentication-model";

export const LoginComponent = () => {
  const useAuthProvider = useAuth();
  const router = useRouter();
  const navigate = Route.useNavigate();

  const { data: userList } = useQuery({
    queryKey: ["getListUsers"],
    queryFn: async () => {
      const response = await getListUsers();
      return response.payload.userList || [];
    },
  });

  const loginForm = useForm<{ userId: string; password: string }>({
    defaultValues: {
      userId: "",
      password: "",
    },
    async onSubmit({ value }) {
      const matchedUser = userList?.find(
        (user: UserProfile) =>
          user.userId === value.userId && user.password === value.password
      );
      if (!matchedUser) {
        alert("Invalid user ID or password");
        return;
      } else {
        const name = matchedUser.name;
        const role = matchedUser.role;
        const userProfile = {
          userId: value.userId,
          name,
          role,
          token: nanoid(),
        };
        useAuthProvider.login(userProfile);
        await router.invalidate();
        if (role === "user") {
          await navigate({ to: "/home" });
        } else if (role === "admin") {
          await navigate({ to: "/admin" });
        }
      }
    },
  });

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 p-6">
      <form
        className="w-full max-w-sm bg-white rounded-lg shadow-lg p-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          loginForm.handleSubmit();
        }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Login</h2>
          <p className="text-lg text-gray-600 mb-8">
            Please log in to continue.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <loginForm.Field name="userId">
            {(field) => (
              <div className="flex flex-col">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  User ID
                </label>
                <input
                  type="text"
                  name="userId"
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            )}
          </loginForm.Field>

          <loginForm.Field name="password">
            {(field) => (
              <div className="flex flex-col">
                <label
                  htmlFor={field.name}
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            )}
          </loginForm.Field>
        </div>

        <loginForm.Subscribe selector={(state) => [state.canSubmit]}>
          {([canSubmit]) => {
            return (
              <button
                className="mt-5 w-full cursor-pointer rounded-lg bg-green-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-green-700 focus:ring-4 focus:ring-green-300"
                type="submit"
                disabled={!canSubmit}
              >
                Login
              </button>
            );
          }}
        </loginForm.Subscribe>
      </form>
    </div>
  );
};

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});
