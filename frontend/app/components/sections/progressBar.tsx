import { Activity } from "lucide-react"

interface ProgressbarProps {
    ratio: number
}

const ProgressBar = ({ratio}: ProgressbarProps) => {
    return (
        <div className="rounded-2xl border-2 border-warning/10 border-dashed bg-warning/5 p-5">
        <div className="flex justify-between items-center mb-1">
          <div className="badge badge-soft badge-warning gap-1">
            <Activity className="w-4 h-4" />
            Dépenses vs Revenus
          </div>
          <div>{ ratio.toFixed(0) }%</div>
          

        </div>

        <progress 
          className="progress progress-warning w-full"
          value={ratio}
          max={100}
        />
        
      </div>
    )
}

export default ProgressBar