import {Button} from 'antd'

interface Props{
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "primary" | "default" | "dashed" | "text" | "link";
    className?: string;
    loader?: boolean;
    disabled? : boolean;
}

export default function CustomButton( {text, onClick, type, className, loader = false, disabled  }: Props ) {
    return (
          <Button onClick={onClick} type={type} className={className} loading={loader} disabled={disabled} >{text}</Button>
    )
}