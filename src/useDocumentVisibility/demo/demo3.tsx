import { useDocumentVisibility } from "..";

const Demo = () => {
  const domVisible = useDocumentVisibility()
  return (
    <div>Current document visibility state: {domVisible}</div>
  );
}
export default Demo;
