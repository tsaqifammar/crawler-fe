import { useForm } from "react-hook-form";
import TreeView from "./components/TreeView";
import Input from "./components/Input";
import { useCrawl } from "./hooks/useCrawl";
import Spinner from "./components/Spinner";
import { UrlInfo } from "./types/url";

const exampleCrawlData: UrlInfo = {
  url: "https://url1.com",
  childUrls: [
    {
      url: "https://url11.com",
      childUrls: [
        {
          url: "https://url111.com",
          childUrls: [],
        },
        {
          url: "https://url112.com",
          childUrls: [],
        },
      ],
    },
    {
      url: "https://url12.com",
      childUrls: [
        {
          url: "https://url121.com",
          childUrls: [],
        },
        {
          url: "https://url122.com",
          childUrls: [],
        },
        {
          url: "https://url123.com",
          childUrls: [],
        },
      ],
    },
    {
      url: "https://url13.com",
      childUrls: [],
    },
    {
      url: "https://url14.com",
      childUrls: [
        {
          url: "https://url141.com",
          childUrls: [],
        },
      ],
    },
  ],
};

const URL_REGEXP =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

function App() {
  const { crawl, data: crawlData, isLoading, error } = useCrawl();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    url: string;
    depth: number;
    maxUrl: number;
  }>();

  const onSubmit = handleSubmit((data) =>
    crawl(data.url, data.depth, data.maxUrl)
  );

  return (
    <div className="min-h-screen bg-slate-950 font-mono text-white w-full">
      <div className="w-4/5 mx-auto py-12 flex flex-col gap-6">
        <h1 className="font-bold text-3xl">Tree URL Crawler</h1>
        <p className="text-lg">
          Enter a URL and it will crawl, explore, and collect the URLs for you!
        </p>
        <form onSubmit={onSubmit}>
          <div className="flex gap-4 items-center justify-start pb-2 flex-wrap lg:flex-nowrap">
            <p className="min-w-max">
              Type here<span className="text-emerald-400 text-lg">:</span>{" "}
            </p>
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
              label="Max Depth"
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
          <p className="italic text-xs text-gray-600">Note: we rate-limited the crawler to only fetch at a maximum of three urls per second, so it may take some time. (although a page of a url may contain a lot of urls)</p>
        </form>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : crawlData == null ? (
          <>
            <p>Example</p>
            <TreeView urlInfo={exampleCrawlData} />
          </>
        ) : (
          <TreeView urlInfo={crawlData} />
        )}
      </div>
    </div>
  );
}

export default App;
