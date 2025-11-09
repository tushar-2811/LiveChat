import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const AvatarComponent = ({src="" , name=""} : any) => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <Avatar >
        <AvatarImage src={src ? src : "https://github.com/shadcn.png"} alt="@shadcn" />
        <AvatarFallback>{name ? name : "User"}</AvatarFallback>
      </Avatar>
    </div>
  )
}

export default AvatarComponent;
