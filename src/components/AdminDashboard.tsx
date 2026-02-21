import AdminPanel from "./AdminPanel";

interface Props {
  admin: any;
  onLogout: () => void;
}

export default function AdminDashboard({ admin, onLogout }: Props) {

  return (

    <div className="min-h-screen flex">

      {/* Sidebar */}

      <div className="w-64 bg-gray-900 text-white p-4">

        <h2 className="text-xl mb-6">
          Admin Panel
        </h2>

        <p className="mb-4">
          Welcome {admin.name}
        </p>

        <button
          onClick={onLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>

      </div>

      {/* Content */}

      <div className="flex-1 p-6">

        <AdminPanel />

      </div>

    </div>

  );
}
