import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { LogOut, LogOutIcon, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { setLoading, setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      dispatch(setLoading(true)); // Start loading state

      const res = await axios.post(
        "http://localhost:5000/api/v1/user/logout",

        { withCredentials: true } // Correctly specifying withCredentials
      );

      if (res.data.success) {
        dispatch(setUser(null));
        // Clear user data from Redux store or local storage here

        navigate("/"); // Redirect to login page
        toast.success(res.data.message); // Show success message
      }
    } catch (error) {
      // Improved error handling
      const errorMessage =
        error.response?.data?.message || "Something went wrong during logout.";
      toast.error(errorMessage); // Display the specific error message
    } finally {
      dispatch(setLoading(false)); // Stop loading state
    }
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Job<span className="text-[#F83002]">Hunt</span>
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <ul className="flex font-medium items-center gap-5 text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-[#F83002] transition-colors duration-200"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-[#F83002] transition-colors duration-200"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#F83002] transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-[#F83002] transition-colors duration-200"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-[#F83002] transition-colors duration-200"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline" className="hover:bg-gray-100">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C6] hover:bg-[#2a1948] text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    className="h-10 w-10 rounded-full"
                    src={user?.profile?.profilePhoto}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4 rounded-lg shadow-md bg-white">
                <div className="flex items-center gap-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      className="h-12 w-12 rounded-full"
                      src={user?.profile?.profilePhoto}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h3 className="font-medium text-lg text-gray-800">
                      {user?.fullname}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col my-4 gap-2 text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900 transition duration-200">
                      <User2 />
                      <Link to="/profile">
                        <Button variant="link" className="text-left pl-2">
                          My Profile
                        </Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center gap-5 mt-4 cursor-pointer hover:text-gray-900 transition duration-200">
                    <LogOut />
                    {/* {loading ? (
                      <Button
                        className="w-full hover:bg-blue-600 font-semibold py-2 px-4 rounded"
                        disabled
                      >
                        <LogOutIcon className="mr-2 h-4 w-4 animate-spin" />
                      </Button>
                    ) : ( */}
                    <Button
                      type="submit"
                      onClick={logoutHandler}
                      className="w-full bg-[#6A38C2] hover:bg-blue-600 font-semibold py- px-4 rounded"
                    >
                      Logout
                    </Button>
                    {/* )} */}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;