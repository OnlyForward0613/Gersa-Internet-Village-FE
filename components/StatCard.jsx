import { BsArrowUpShort, BsArrowDownShort } from "react-icons/bs";

const StatCard = ({ title, value, rise, percentage, icon, accent }) => {
  return (
    <div className="bg-pwgray-200/90 p-3 rounded-lg shadow w-80 flex flex-row gap-10">
      <div className="flex flex-col justify-between">
        <span className="font-excon text-xl capitalize">{title}</span>
        <span className="font-excon text-2xl">{value}</span>
        <div className="flex flex-row">
          <span
            className={
              rise
                ? "bg-pwsuccess-100 w-fit px-1 rounded-lg flex flex-row items-center"
                : "bg-pwdanger-100 w-fit px-1 rounded-lg flex flex-row items-center"
            }
          >
            {rise ? (
              <BsArrowUpShort size={20} color={"#198754"} />
            ) : (
              <BsArrowDownShort size={20} color={"#dc3545"} />
            )}

            <span
              className={
                rise
                  ? "font-pally text-sm w-9 text-pwsuccess-300"
                  : "font-pally text-sm w-9 text-pwdanger-300"
              }
            >
              {percentage + "%"}
            </span>
          </span>
          <span className="text-sm mx-2 text-pwgray-400">Since last month</span>
        </div>
      </div>
      <div className="my-auto">
        <div className={"p-4 rounded-full " + accent}>{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
