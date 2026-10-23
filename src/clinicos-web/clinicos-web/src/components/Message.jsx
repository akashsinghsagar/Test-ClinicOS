export default function Message({ message }) {
  if (!message) return <div className="message" role="status" />;
  return (
    <div className={`message show${message.type ? ` ${message.type}` : ''}`} role="status">
      {message.text}
    </div>
  );
}
