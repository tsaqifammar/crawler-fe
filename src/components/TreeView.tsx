type TreeViewProps = {
  urlInfo: UrlInfo;
};

function TreeView({ urlInfo }: TreeViewProps) {
  return (
    <div>
      <h1>{urlInfo.url}</h1>
      {urlInfo.childUrls.map((item, idx) => (
        <div key={idx} className="ml-4">
          <TreeView urlInfo={item} />
        </div>
      ))}
    </div>
  );
}

export default TreeView;
