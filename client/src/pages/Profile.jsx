import useAuth from "../hooks/useAuth";

function Profile() {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <h1>Please login first.</h1>;
  }
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <h1 className="mb-8 text-3xl font-bold">Profile</h1>

        <div className="flex items-center gap-6">
          <img
            src={user.picture}
            alt={user.firstName}
            className="h-24 w-24 rounded-full"
          />

          <div>
            <h2 className="text-2xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>

            <p className="text-gray-600">{user.email}</p>

            <p className="mt-2 text-sm text-gray-500">Signed in with Google</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
