import ElementJS from '../molecules/ElementJS'
import WrapperDevEdit from '../organisms/WrapperDevEdit'

export default function Page() {
  return (
    <WrapperDevEdit>
      <div className="flex flex-col gap-5">
        <ElementJS id="js_1" />
        <ElementJS id="js_2" />
        <ElementJS id="js_3" />
        <div className="h-[600px]">Test</div>
      </div>
    </WrapperDevEdit>
  )
}
