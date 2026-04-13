export default function TicketBadge({ status }) {
  const baseClasses = "text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full whitespace-nowrap";
  
  const statusClasses = {
    urgent: 'bg-tertiary-container/30 text-tertiary border border-tertiary/20',
    pending: 'bg-surface-container-highest text-on-surface-variant border border-outline-variant/20',
    resolved: 'bg-secondary-container/30 text-secondary border border-secondary/20'
  };
  
  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>
      {status}
    </span>
  );
}
