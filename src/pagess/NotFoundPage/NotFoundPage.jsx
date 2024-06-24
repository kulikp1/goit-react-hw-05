import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <p>OOOOPS!!! Page not found</p>
      <Link to="/">Return to Homepage</Link>
    </div>
  );
}