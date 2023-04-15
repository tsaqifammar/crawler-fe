import { useState } from "react";
import { TbChevronDown, TbChevronUp, TbCircleFilled } from "react-icons/tb";
import { UrlInfo } from "../types/url";

type TreeViewProps = {
  urlInfo: UrlInfo;
};

const truncateString = (string = "", maxLength = 35) =>
  string.length > maxLength ? `${string.substring(0, maxLength)}...` : string;

function TreeView({ urlInfo }: TreeViewProps) {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="py-1 px-2 border rounded-l-md shadow bg-gray-800 border-gray-700 hover:bg-gray-700"
          disabled={urlInfo.childUrls.length === 0}
        >
          {urlInfo.childUrls.length === 0 ? (
            <TbCircleFilled size={4} />
          ) : !open ? (
            <TbChevronDown />
          ) : (
            <TbChevronUp />
          )}
        </button>
        <a
          href={urlInfo.url}
          target="_blank"
          className="flex-grow block max-w-sm py-1 px-2 border rounded-r-md shadow bg-gray-800 border-gray-700 border-l-0 hover:bg-gray-700"
        >
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {truncateString(urlInfo.url)}
          </p>
        </a>
      </div>
      {open &&
        urlInfo.childUrls.map((item, idx) => (
          <div key={idx} className="border-l-2 border-emerald-800 pl-6 ml-2">
            <TreeView urlInfo={item} />
          </div>
        ))}
    </div>
  );
}

export default TreeView;
