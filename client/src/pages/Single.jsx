import { Link } from 'react-router-dom';
import Menu from "../components/Menu";
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';

function Single() {
    return (
      <div className="single">
        <div className="content">
          <img src="" alt="" />
          <div className="user">
            <img src="" alt="" />
            <div className="info">
              <span>John</span>
              <p>Posted 2 days ago</p>
            </div>
            <div className="edit">
              <Link to={'/write?edit=2'}>
                <img src={Edit} alt="edit" />
              </Link>
              <img src={Delete} alt="delete" />
            </div>
          </div>
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis dolores dicta quas ad, incidunt accusantium sequi ea sed consectetur, beatae suscipit.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis culpa nisi odit vel ut voluptatibus, debitis quas officia modi, totam earum nemo ipsam qui iste eligendi minima? Minima, enim praesentium? Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis culpa nisi odit vel ut voluptatibus, debitis quas officia modi, totam earum nemo ipsam qui iste eligendi minima? Minima, enim praesentium? Minima, enim praesentium? Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis culpa nisi odit vel ut voluptatibus, debitis quas officia modi, totam earum nemo ipsam qui iste eligendi minima? Minima, enim praesentium?</p>
        </div>
        <Menu />
      </div>
    );
  }
  
  export default Single;