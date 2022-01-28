import { linkClasses, Chevron } from 'shared/components/navigation/primary.js'
import Option from './option'

const OptionSubGroup = props => {
  return Object.keys(props.sub).map(name => (
    <li className="flex flex-row">
      <details className="grow">
        <summary className={`
          flex flex-row
          px-2
          text-base-content
          sm:text-neutral-content
          hover:cursor-row-resize
          items-center
        `}>
          <div className={`
            grow pl-2 border-l-2
            ${linkClasses}
            hover:cursor-resize
            hover:border-secondary
            sm:hover:border-secondary-focus
            text-base-content sm:text-neutral-content
            font-bold
          `}>
            <span className={`
              text-3xl mr-2 inline-block p-0 leading-3
              translate-y-3
            `}>
              <>&deg;</>
            </span>
            <span>
              { props.app.t(`optiongroups.${name}`) }
            </span>
          </div>
          <Chevron w={6} m={3}/>
        </summary>
        <ul className="pl-5 list-inside">
          {props.sub[name].map(option => typeof option === 'string'
            ? <Option {...props} option={option} key={option} />
            : <OptionSubGroup {...props} sub={option} config={config} />
          )}
        </ul>
      </details>
    </li>
  ))
}

export default OptionSubGroup