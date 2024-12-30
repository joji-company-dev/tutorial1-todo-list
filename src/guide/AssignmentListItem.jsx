export function AssignmentListItem({
  title,
  description,
  projectHref,
  specificationHref,
}) {
  return (
    <li className="flex flex-col gap-2 border rounded-md border-[var(--foreground)] p-4">
      <h2 className="text-3xl">{title}</h2>
      <p>{description}</p>
      <a
        className="bg-[var(--foreground)] text-[var(--background)] inline-block p-2 font-bold rounded-md hover:opacity-70"
        href={projectHref}
      >
        결과물 페이지
      </a>
      <a
        className="bg-[var(--foreground)] text-[var(--background)] inline-block p-2 font-bold rounded-md hover:opacity-70"
        href={specificationHref}
      >
        스펙 페이지
      </a>
    </li>
  );
}
