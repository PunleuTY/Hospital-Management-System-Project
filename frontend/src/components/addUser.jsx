import Input from "./Common/Input";
import Button from "./Common/Button";
import Dropdown from "./Common/Dropdown";
import { use, useEffect, useState } from "react";

export default function AddUser() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [errors, setErrors] = useState({
    userName: false,
    password: false,
    role: false,
  });

  // Role Option
  const roleOptions = ["Nurse", "Receptionist", "Doctor"];

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const reset = () => {
    setUserName("");
    setPassword("");
    setSelectedRole("");
    setErrors({ userName: false, password: false, role: false });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { userName: false, password: false, role: false };

    if (!userName) {
      newErrors.userName = true;
      isValid = false;
    } else {
      newErrors.userName = false;
    }
    if (!password) {
      newErrors.password = true;
      isValid = false;
    } else {
      newErrors.password = false;
    }
    if (!selectedRole) {
      newErrors.role = true;
      isValid = false;
    } else {
      newErrors.role = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    const validateStatus = validate();
    if (validateStatus) {
      const newUser = {
        username: userName,
        password: password,
        role: selectedRole,
      };
      // Here you can add the logic to submit the form data
      console.log("Form submitted successfully");
      console.log(newUser);
      reset();
    }
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl font-bold mb-1">Add User</h1>
      <div className="flex gap-5">
        <div className="flex-1 border border-(--color-gray) rounded-md p-3">
          <div>
            <div className="flex gap-2">
              <p>Username</p>
              {errors.userName && (
                <p className="text-red-500">Please enter username</p>
              )}
            </div>
            <Input
              className="mb-3"
              type="text"
              placeholder="Enter Username"
              name="username"
              onChange={handleUserNameChange}
              value={userName}
            />
          </div>
          <div className="flex-1">
            <div className="flex gap-2">
              <p>Password</p>
              {errors.password && (
                <p className="text-red-500">Please enter password</p>
              )}
            </div>
            <Input
              className="mb-3"
              type="text"
              placeholder="Enter Password"
              name="password"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <div>
            <div className="flex gap-2">
              <p>Role</p>
              {errors.role && (
                <p className="text-red-500">Please select a role</p>
              )}
            </div>
            <div className="flex gap-3">
              <Dropdown
                options={roleOptions}
                defaultLabel="Choose a Role"
                onSelect={setSelectedRole}
              />
              <Button
                content={"Add User"}
                onClick={handleSubmit}
                isAddIcon={true}
              />
            </div>
          </div>
        </div>
        <div className="flex-1 border border-(--color-gray) rounded-md p-3">
          <h2 className="font-bold text-2xl mb-2">User Summarization</h2>
          <div>
            <p>Total User: 13</p>
            <p className="mt-2">Total Doctor: 5</p>
            <p className="mt-2">Total Nurse: 4</p>
            <p className="mt-2">Total Receptionist: 4</p>
          </div>
        </div>
      </div>
    </div>
  );
}
