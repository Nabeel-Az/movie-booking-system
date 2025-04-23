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

  // const getUserByIdMutation = useMutation({
  //   mutationFn: (userId: string) => {
  //     return getUserById(userId);
  //   },
  //   onSuccess: async (response, userId) => {
  //     const name = userList?.find((user) => user.userId === userId)?.name ?? "";
  //     const role = userList?.find((user) => user.userId === userId)?.role ?? "";
  //     const userProfile = {
  //       userId,
  //       name,
  //       role,
  //       token: nanoid(),
  //     };
  //     useAuthProvider.login(userProfile);
  //     // await router.invalidate();
  //     // await navigate({ to: search.redirect ?? fallback });
  //   },
  // });

  // const handleLogout = () => {
  //   useAuthProvider.logout();
  // };

  const loginForm = useForm<{ userId: string; password: string }>({
    defaultValues: {
      userId: "",
      password: "",
    },
    async onSubmit({ value }) {
      console.log(value);
      // getUserByIdMutation.mutate(value.userId);

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
        console.log(userProfile);
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

  // return (
  //   <div className="bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen flex items-center justify-center px-4">
  //     <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-xl">
  //       {user ? (
  //         <div className="text-center">
  //           <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Welcome, {user.username}!</h2>
  //           <p className="text-lg text-gray-600 mb-8">You are successfully logged in.</p>
  //           <div className="flex justify-center gap-6">
  //             {/* <Link
  //               to="/home"
  //               className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
  //             >
  //               Go to Home Page
  //             </Link> */}
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="text-center">
  //           <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Movie Booking Management System!</h2>
  //           <p className="text-lg text-gray-600 mb-8">Please log in to continue.</p>
  //           <button
  //             onClick={() => login('Blake Timothy')}
  //             className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
  //           >
  //             Login
  //           </button>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );

  // return (
  //   <div className="bg-gradient-to-r from-blue-500 to-teal-500 min-h-screen flex items-center justify-center px-4">
  //     <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-xl">
  //         <div className="text-center">
  //           <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Movie Booking Management System!</h2>
  //           <p className="text-lg text-gray-600 mb-8">Please log in to continue.</p>
  //           <button
  //             // onClick={() => login('Blake Timothy')}
  //             className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
  //           >
  //             Login
  //           </button>
  //         </div>
  //     </div>
  //   </div>
  // );

  // const { setUserProfile, clearUserProfile, isAuthenticated, userProfile } =
  //   useAuthStore();
  // const [formType, setFormType] = useState<"login" | "register">("login");
  // const [formData, setFormData] = useState({
  //   name: "",
  //   userId: "",
  //   password: "",
  //   role: "",
  //   token: nanoid()
  // });

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const userProfile = { //temp user
  //   name: "John Doe",
  //   userId: formData.userId,
  //   password: "user123",
  //   role : "admin",
  //   token: nanoid(),
  // }

  // const adminProfile = { //temp admin
  //   name: "John Doe",
  //   userId: formData.userId,
  //   password: "admin123",
  //   role : "admin",
  //   token: nanoid(),
  // }

  /*const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formType === "login") {
       // Simulate user login
      useAuthProvider.login(userProfile);

      //Simulate admin login
      // useAuthProvider.login(adminProfile);

      // setUserProfile({
      //   name: "John Doe",
      //   userId: formData.userId,
      //   role : "admin",
      //   token: nanoid(),
      // });
    } else {
      // Simulate registration
      useAuthProvider.login({
        name: formData.name,
        userId: formData.userId,
        role: formData.role,
        token: nanoid(),
      })

      // setUserProfile({
      //   name: formData.name,
      //   userId: formData.userId,
      //   role: "admin",
      //   token: nanoid(),
      // });
    }
  }; */

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center p-2">
      <form
        className="mt-4 max-w-lg min-w-sm"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          loginForm.handleSubmit();
        }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Movie Booking Management System
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Please log in to continue.
          </p>
        </div>
        <div className="flex flex-col">
          <loginForm.Field name="userId">
            {(field) => (
              <div className="mb-3 flex flex-col">
                <label htmlFor={field.name} className="block mb-1">
                  User ID
                </label>
                <input
                  type="text"
                  name="userId"
                  // value={formData.userId}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            )}
          </loginForm.Field>
          <loginForm.Field name="password">
            {(field) => (
              <div className="mb-3 flex flex-col">
                <label htmlFor={field.name} className="block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  // value={formData.password}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  className="w-full p-2 border rounded"
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
                className="mt-5 w-full cursor-pointer rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
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
