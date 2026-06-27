export default function Pill({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 border border-silver px-3 py-2">
      <Icon size={13} strokeWidth={1.5} className="text-gray shrink-0" />
      <span className="text-xs font-arizona-sans-regular tracking-widest uppercase text-gray">
        {label}
      </span>
    </div>
  );
}
