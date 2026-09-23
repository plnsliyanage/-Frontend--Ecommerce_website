import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader } from "../../components/loader";
import { MdOutlineAdminPanelSettings, MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Sample mock users data for instant preview and testing
const sampleUsers = [
  {
    email: "sarah.crochet@gmail.com",
    firstName: "Sarah",
    lastName: "Jenkins",
    role: "admin",
    isEmailVerified: true,
    isBlock: false,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  },
  {
    email: "amara.perera@yahoo.com",
    firstName: "Amara",
    lastName: "Perera",
    role: "customer",
    isEmailVerified: true,
    isBlock: false,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
  },
  {
    email: "john.doe.crafts@outlook.com",
    firstName: "John",
    lastName: "Doe",
    role: "customer",
    isEmailVerified: false,
    isBlock: true,
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
  },
  {
    email: "emily.yarns@gmail.com",
    firstName: "Emily",
    lastName: "Blunt",
    role: "customer",
    isEmailVerified: true,
    isBlock: false,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
  },
];

function UserBlockConfirm(props) {
  const email = props.user.email;
  const close = props.close;
  const refresh = props.refresh;

  function blockUser() {
    const token = localStorage.getItem("token");

    // Uncomment when connecting to your live backend:
    /*
    axios
      .put(
        import.meta.env.VITE_API_URL + "/api/users/block/" + email,
        {
          isBlock: !props.user.isBlock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        close();
        toast.success("User block status changed successfully");
        refresh();
      })
      .catch(() => {
        toast.error("Failed to change user block status");
      });
    */

    // Mock block action for sample data testing:
    toast.success(`User block status changed successfully for ${email}`);
    refresh(email);
    close();
  }

  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center font-sans">
      <div className="w-[450px] bg-[#FFF9F0] border border-[#EAD7C2] p-8 rounded-3xl shadow-xl relative flex flex-col justify-center items-center gap-6">
        <button
          onClick={close}
          className="absolute right-4 top-4 w-8 h-8 bg-[#5D4037] text-[#FFF9F0] rounded-full flex justify-center items-center font-bold hover:bg-[#3E2723] transition"
        >
          ✕
        </button>
        <div className="text-center">
          <span className="text-3xl">⚠️</span>
          <p className="text-lg font-bold text-[#3E2723] mt-2">
            Confirm Status Change
          </p>
          <p className="text-sm text-[#6D4C41] mt-1">
            Are you sure you want to{" "}
            <span className="font-bold underline">
              {props.user.isBlock ? "unblock" : "block"}
            </span>{" "}
            the user with email:{" "}
            <span className="font-mono text-xs text-[#5D4037]">{email}</span>?
          </p>
        </div>
        <div className="flex gap-4 w-full">
          <button
            onClick={close}
            className="flex-1 bg-[#EAD7C2]/60 py-2.5 rounded-xl font-semibold text-[#3E2723] hover:bg-[#EAD7C2] transition"
          >
            Cancel
          </button>
          <button
            onClick={blockUser}
            className="flex-1 bg-red-600 py-2.5 rounded-xl font-semibold text-white hover:bg-red-700 transition shadow-xs"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  // Initialized with sampleUsers for instant preview
  const [users, setUsers] = useState(sampleUsers);
  const [isBlockConfirmVisible, setIsBlockConfirmVisible] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  /*
    Uncomment when connecting to your live backend:
    useEffect(() => {
      if (isLoading) {
        const token = localStorage.getItem("token");
        if (token == null) {
          toast.error("Please login to access admin panel");
          navigate("/login");
          return;
        }
        axios
          .get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setUsers(response.data);
            setIsLoading(false);
          });
      }
    }, [isLoading]);
  */

  const handleRefreshAfterBlock = (targetEmail) => {
    setUsers(
      users.map((u) =>
        u.email === targetEmail ? { ...u, isBlock: !u.isBlock } : u,
      ),
    );
  };

  return (
    <div className="w-full min-h-full font-sans pb-20">
      {isBlockConfirmVisible && (
        <UserBlockConfirm
          refresh={handleRefreshAfterBlock}
          user={userToBlock}
          close={() => {
            setIsBlockConfirmVisible(false);
          }}
        />
      )}

      {/* Page container */}
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-[#EAD7C2] bg-[#FFF9F0] shadow-sm overflow-hidden">
          {/* Header bar */}
          <div className="flex items-center justify-between gap-4 border-b border-[#EAD7C2] px-8 py-6 bg-[#FAF6EE]">
            <div>
              <h1 className="text-2xl font-bold text-[#3E2723] tracking-tight">
                Users Management 👥
              </h1>
              <p className="text-xs sm:text-sm text-[#6D4C41] mt-1">
                Monitor user accounts, verify access privileges, and manage
                statuses.
              </p>
            </div>
            <span className="rounded-full bg-[#5D4037] text-[#FFF9F0] px-4 py-2 text-xs font-semibold shadow-xs">
              {users.length} active users
            </span>
          </div>

          {/* Table wrapper for responsive scrolling */}
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-24 flex justify-center">
                <Loader />
              </div>
            ) : (
              <table className="w-full min-w-[880px] text-left border-collapse">
                <thead className="bg-[#5D4037] text-[#FFF9F0]">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      First Name
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Last Name
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#EAD7C2]/60">
                  {users.map((user) => {
                    return (
                      <tr
                        key={user.email}
                        className="bg-[#FFF9F0] hover:bg-[#FAF6EE] transition-colors"
                      >
                        <td className="px-6 py-3">
                          <img
                            src={user.image}
                            referrerPolicy="no-referrer"
                            alt={user.firstName}
                            className={
                              "h-14 w-14 rounded-full object-cover border-2 shadow-2xs " +
                              (user.isBlock
                                ? "border-red-600 opacity-60"
                                : "border-emerald-600")
                            }
                          />
                        </td>
                        <td className="px-6 py-3 font-mono text-xs text-[#5D4037] font-semibold">
                          <div className="flex items-center gap-2">
                            <span>{user.email}</span>
                            {user.isEmailVerified && (
                              <span title="Email Verified">
                                <MdVerified className="text-blue-600 text-base" />
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-3 font-semibold text-[#3E2723]">
                          {user.firstName}
                        </td>
                        <td className="px-6 py-3 font-medium text-[#6D4C41]">
                          {user.lastName}
                        </td>
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-2">
                            {user.role === "admin" && (
                              <span title="Administrator">
                                <MdOutlineAdminPanelSettings className="text-[#5D4037] text-lg" />
                              </span>
                            )}
                            <span
                              className={`px-2.5 py-1 rounded-xl text-xs font-bold uppercase tracking-wider ${
                                user.role === "admin"
                                  ? "bg-amber-100 text-amber-900"
                                  : "bg-[#EAD7C2]/50 text-[#5D4037]"
                              }`}
                            >
                              {user.role}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-3 text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => {
                                setUserToBlock(user);
                                setIsBlockConfirmVisible(true);
                              }}
                              className={`w-28 h-9 rounded-xl font-semibold text-xs tracking-wider uppercase transition shadow-xs cursor-pointer ${
                                user.isBlock
                                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                  : "bg-rose-600 text-white hover:bg-rose-700"
                              }`}
                            >
                              {user.isBlock ? "Unblock" : "Block"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {users.length === 0 && (
                    <tr>
                      <td
                        className="px-6 py-20 text-center text-[#6D4C41]"
                        colSpan={6}
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="text-4xl">👥</span>
                          <p className="text-base font-semibold text-[#3E2723]">
                            No users to display
                          </p>
                          <p className="text-xs text-[#6D4C41]">
                            There are currently no registered profiles found.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
