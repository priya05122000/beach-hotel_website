export default function LocationSection() {
  return (
    <div className="shadow-xl">
      <iframe
        src="https://www.google.com/maps?q=Kanyakumari&output=embed"
        width="100%"
        height="500"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="border-0"
      />
    </div>
  );
}
