import { Users } from "lucide-react";
import React from "react";

const SideBarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <div>
      <aside className="h-full w-20 lg:w-64 bg-gray-800 border-r border-blue-300 flex flex-col transition-all duration-300">
     
        <div className="border-b border-blue-500 w-full p-5">
          <div className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            <span className="font-medium hidden lg:block">Contacts</span>
          </div>
        </div>

      
        <div className="overflow-y-auto w-full py-3">
          {skeletonContacts.map((_, index) => (
            <div key={index} className="flex items-center gap-2 p-3">
              <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
              <div className="relative mx-auto lg:mx-0">
                <div className="skeleton rounded-full size-12"></div>
                <div className="hidden text-left lg:block flex-1 min-w-0">
                  <div className="skeleton h-4 w-32 mb-2"></div>
                  <div className="skeleton h-3 w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default SideBarSkeleton;
