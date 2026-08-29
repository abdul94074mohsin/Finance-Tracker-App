import FeedCard from './FeedCard';

function FeedList({ items }) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <FeedCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default FeedList;
