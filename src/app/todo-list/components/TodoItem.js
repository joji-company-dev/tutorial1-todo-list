export default function TodoItem({ 
    id, 
    text, 
    onDelete 
}) {
    return (
      <li className="flex justify-between items-center border-b p-2">
        <span>{text}</span>
        <button
          onClick={() => onDelete(id)}
          className="text-red-500 hover:underline"
        >
          삭제
        </button>
      </li>
    );
  }
  