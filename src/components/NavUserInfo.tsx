const UserInfo = ({ name, role }: { name: string; role: string }) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="text-white">Welcome {name}</div>
      <div className="text-white">
        Role: {role.charAt(0).toUpperCase() + role.slice(1)}
      </div>
    </div>
  );
};

export default UserInfo;
