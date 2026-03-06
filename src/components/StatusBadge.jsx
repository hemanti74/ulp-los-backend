export default function StatusBadge({ status }) {
  const slug = status.toLowerCase().replace(/\s+/g, '-');
  return (
    <span className={`status-badge ${slug}`}>
      <span className="status-dot" />
      {status}
    </span>
  );
}
