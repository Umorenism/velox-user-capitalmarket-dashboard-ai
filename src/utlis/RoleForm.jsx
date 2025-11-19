import React, { useState } from "react";
import { Bold, Italic, Link, List, ListOrdered } from "lucide-react";

const RoleForm = () => {
  const [permissions, setPermissions] = useState({
    Dashboard: true,
    "Banners and Promotions": false,
    Transactions: false,
    Withdrawals: false,
    Overview: false,
    Settings: false,
    Packages: false,
  });

  const [options, setOptions] = useState({
    view: true,
    create: true,
    edit: true,
    delete: true,
    export: true,
  });

  const [selectAll, setSelectAll] = useState(true);

  const handlePermissionChange = (key) => {
    setPermissions({ ...permissions, [key]: !permissions[key] });
  };

  const handleOptionChange = (key) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  const handleSelectAll = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);
    const allTrueOrFalse = Object.keys(options).reduce((acc, key) => {
      acc[key] = newValue;
      return acc;
    }, {});
    setOptions(allTrueOrFalse);
  };

  return (
    <div className="w-full dark:bg-neutral-900 dark:text-white mx-auto bg-white rounded-lg shadow border border-gray-200 p-6">
      <h2 className="text-gray-800 dark:bg-neutral-900 dark:text-white font-semibold text-lg mb-4">
        Basic details
      </h2>

      <form className="space-y-6">
        {/* Role Name */}
        <div>
          <label className="block dark:bg-neutral-900 dark:text-white text-gray-700 text-sm font-medium mb-1">
            Role Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter role name"
            className="w-full dark:bg-transparent dark:text-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>

        {/* Role Description */}
        <div>
          <label className="block dark:bg-neutral-900 dark:text-white text-gray-700 text-sm font-medium mb-1">
            Role Description<span className="text-red-500">*</span>
          </label>

          <div className="border dark:bg-neutral-900 dark:text-white border-gray-300 rounded-md">
            {/* Toolbar */}
            <div className="flex items-center gap-3 border-b border-gray-200 px-3 py-2">
              <button
                type="button"
                className="text-gray-600 hover:text-indigo-600"
              >
                <Bold size={18} />
              </button>
              <button
                type="button"
                className="text-gray-600 hover:text-indigo-600"
              >
                <Italic size={18} />
              </button>
              <button
                type="button"
                className="text-gray-600 hover:text-indigo-600"
              >
                <Link size={18} />
              </button>
              <button
                type="button"
                className="text-gray-600 hover:text-indigo-600"
              >
                <List size={18} />
              </button>
              <button
                type="button"
                className="text-gray-600 hover:text-indigo-600"
              >
                <ListOrdered size={18} />
              </button>
            </div>

            {/* Textarea */}
            <textarea
              rows={5}
              placeholder="Enter role description"
              className="w-full px-3 py-2 text-sm dark:bg-transparent dark:text-white text-gray-700 rounded-b-md outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            ></textarea>
          </div>
        </div>

        {/* Access Permissions */}
        <div>
          <label className="block dark:bg-neutral-900 dark:text-white text-gray-700 text-sm font-medium mb-2">
            Access Permissions<span className="text-red-500">*</span>
          </label>

          <div className="flex flex-wrap gap-4">
            {Object.keys(permissions).map((key) => (
              <label
                key={key}
                className="flex dark:bg-neutral-900 dark:text-white items-center text-sm text-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={permissions[key]}
                  onChange={() => handlePermissionChange(key)}
                  className="mr-2 dark:bg-neutral-900 dark:text-white accent-emerald-500"
                />
                {key}
              </label>
            ))}
          </div>
        </div>

        {/* Options */}
        <div className="border border-gray-200 rounded-md p-4 dark:bg-neutral-900 dark:text-white">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-800 text-sm dark:bg-transparent dark:text-white">Options</h3>
            <label className="flex items-center dark:bg-transparent dark:text-white text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="mr-2 dark:bg-neutral-900 dark:text-white accent-black"
              />
              Select all options
            </label>
          </div>

          <div className="grid gap-2">
            <label className="flex dark:bg-neutral-900 dark:text-white items-center text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={options.view}
                onChange={() => handleOptionChange("view")}
                className="mr-2 accent-emerald-500"
              />
              User can View
            </label>
            <label className="flex dark:bg-neutral-900 dark:text-white items-center text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={options.create}
                onChange={() => handleOptionChange("create")}
                className="mr-2 dark:bg-neutral-900 dark:text-white accent-emerald-500"
              />
              User can Create
            </label>
            <label className="flex dark:bg-neutral-900 dark:text-white items-center text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={options.edit}
                onChange={() => handleOptionChange("edit")}
                className="mr-2 dark:bg-neutral-900 dark:text-white accent-emerald-500"
              />
              User can Edit
            </label>
            <label className="flex dark:bg-neutral-900 dark:text-white items-center text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={options.delete}
                onChange={() => handleOptionChange("delete")}
                className="mr-2 dark:bg-neutral-900 dark:text-white accent-emerald-500"
              />
              User can Delete
            </label>
            <label className="flex dark:bg-neutral-900 dark:text-white items-center text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={options.export}
                onChange={() => handleOptionChange("export")}
                className="mr-2 dark:bg-neutral-900 dark:text-white accent-emerald-500"
              />
              User can export
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RoleForm;
