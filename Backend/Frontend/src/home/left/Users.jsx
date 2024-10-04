import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const[allUsers, loading] = useGetAllUsers();
  console.log(allUsers)
  
  return (

    <>
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
      
      {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}        


      </div>


    </>
  );
}

export default Users;