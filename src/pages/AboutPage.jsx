import Card from "../components/shared/Card"
import { Link } from "react-router-dom"

function AboutPage() {
  return (
    <Card>
        <div className="about">
            <h2>About This Project</h2>
            <p>This is a simple react app to provide feedback on a product or service.</p>
            <p>Version: 1.0.0</p>

            <Link to="/">Back to Home Page</Link>
        </div>
    </Card>
  )
}

export default AboutPage