import { useForm } from "react-hook-form";
import TreeView from "./components/TreeView";
import Input from "./components/Input";

const testData: UrlInfo = {
  url: "https://google.com",
  childUrls: [
    {
      url: "child1",
      childUrls: [
        {
          url: "child11",
          childUrls: [],
        },
        {
          url: "child12",
          childUrls: [],
        },
      ],
    },
    {
      url: "child2",
      childUrls: [
        {
          url: "child21",
          childUrls: [],
        },
        {
          url: "child22",
          childUrls: [],
        },
        {
          url: "child23",
          childUrls: [],
        },
      ],
    },
    {
      url: "child3",
      childUrls: [],
    },
    {
      url: "child4",
      childUrls: [
        {
          url: "child41",
          childUrls: [],
        },
      ],
    },
  ],
};

const URL_REGEXP =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    url: string;
    depth: number;
    maxUrl: number;
  }>();

  const onSubmit = handleSubmit((data) => {
    console.log("data?", data)
  });

  return (
    <div className="min-h-screen bg-slate-950 font-mono text-white w-full">
      <div className="w-4/5 mx-auto py-12 flex flex-col gap-6">
        <h1 className="font-bold text-3xl">Tree URL Crawler</h1>
        <p className="text-lg">
          Enter a URL and it will crawl, explore, and collect the URLs for you!
        </p>
        <form onSubmit={onSubmit}>
          <div className="flex gap-4 items-center justify-start pb-2 flex-wrap lg:flex-nowrap">
            <p className="min-w-max">Type here<span className="text-emerald-400 text-lg">:</span>{" "}</p>
            <Input
              label="URL (Ex. https://google.com)"
              className="flex-1"
              {...register("url", {
                pattern: { value: URL_REGEXP, message: "Must be a valid url" },
                required: true,
              })}
              error={errors.url?.message}
            />
            <Input
              label="Depth"
              type="number"
              min={1}
              max={20}
              required
              {...register("depth", { required: true })}
            />
            <Input
              label="Max URL Fetched"
              defaultValue={100}
              type="number"
              min={1}
              max={200}
              required
              {...register("maxUrl", { required: true })}
            />
            <button
              className="ml-2 text-emerald-700 hover:text-white border border-emerald-700 hover:bg-emerald-800 rounded-sm focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium text-sm px-5 py-2.5 text-center dark:border-emerald-500 dark:text-emerald-500 dark:hover:text-white dark:hover:bg-emerald-600 dark:focus:ring-emerald-800 transition-all"
              type="submit"
            >
              Crawl
            </button>
          </div>
        </form>
        <TreeView urlInfo={testData} />
      </div>
    </div>
  );
}

export default App;
