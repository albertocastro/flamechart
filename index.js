// flame chart: https://developer.mozilla.org/en-US/docs/Tools/Performance/Flame_Chart

const log = [
  {
    name: "A",
    duration: 1000,
    children: [
      { name: "AA", duration: 200 },
      { name: "AB", duration: 400 },
      {
        name: "AC",
        duration: 400,
        children: [
          {
            name: "ACA",
            duration: 300,
            children: [
              { name: "ACAA", duration: 100 },
              { name: "ACAB", duration: 200 }
            ]
          },
          { name: "ACB", duration: 100 }
        ]
      }
    ]
  }
];

// / A                                 // B /
// / AA    / / AB          / / AC      /
//  
// [ [],[],[] ]
const FACTOR = 0.4;
const Block = ({name,width,onMouseDown})=>{
    
    const style = {border:"1px solid",display:"inline-block"}
    const newWidth = width *  FACTOR
    style.width= newWidth
    return (
        <div onMouseDown={onMouseDown} style={style}>
            {name}
        </div>)
}
const App = () => {
    
    const [displayDuration,setDisplayDuration] = React.useState(null)
    
    const handlerMouseOn = (duration)=>{
        setDisplayDuration(duration)
    }
    const getChildren = (children)=>{
        
        if(!children) return null
        return <>
            {
                children.map(child=>(
                    <div>
                    <Block name={child.name} width={child.duration} onMouseDown={()=>handlerMouseOn(child.duration)} />
                     <div style={{display:"flex"}}> 
                    {
                        getChildren(child.children)
                    }
                      </div>
                    </div>))
            }
        </>
    }
    return (
    <div className="app">
    
        {
            log.map(({name,children,duration}) => (<div>
            <Block name={name} width={duration} onMouseDown={()=>handlerMouseOn(duration)}/>
            <div style={{display:"flex"}}> 
                   {
                getChildren(children)
            }
            
            </div>
     
         
            </div>))
        }
        {
            displayDuration && <div>Duration: {displayDuration}</div>
        }
        
    </div>
);
}

ReactDOM.render(<App />, document.getElementById('app'));
