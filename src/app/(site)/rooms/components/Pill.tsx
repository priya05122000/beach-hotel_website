export default function Pill({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex type-button-sm items-center gap-2 border border-silver px-3 py-2">
      <Icon size={13} strokeWidth={1.5} className="text-gray shrink-0" />
      <span className=" tracking-widest uppercase text-gray">
        {label}
      </span>
    </div>
  );
}
