import ElementJS from '../molecules/ElementJS'
import WrapperDevEdit from '../organisms/WrapperDevEdit'

export default function Page() {
  return (
    <WrapperDevEdit>
      <div className="">
        <ElementJS />
        <div className="h-[600px]">Test</div>
      </div>
    </WrapperDevEdit>
  )
}
