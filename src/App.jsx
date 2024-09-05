import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import HomePage from "./pages/HomePage";
import JobPage, { jobLoader } from "./pages/JobPage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { db } from "./firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const jobs = [
  {
    title: "Front-End Engineer (React & Redux)",
    type: "Full-Time",
    location: "Miami, FL",
    description:
      "Join our team as a Front-End Developer in sunny Miami, FL. We are looking for a motivated individual with a passion for crafting beautiful and responsive web applications. Experience with UI/UX design principles and a strong attention to detail are highly desirable.",
    salary: "$70K - $80K",
    company: {
      name: "Veneer Solutions",
      description:
        "Veneer Solutions is a creative agency specializing in digital design and development. Our team is dedicated to pushing the boundaries of creativity and innovation to deliver exceptional results for our clients.",
      contactEmail: "contact@loremipsum.com",
      contactPhone: "555-555-5555",
    },
  },
  {
    title: "React.js Dev",
    type: "Full-Time",
    location: "Brooklyn, NY",
    description:
      "Are you passionate about front-end development? Join our team in vibrant Brooklyn, NY, and work on exciting projects that make a difference. We offer competitive compensation and a collaborative work environment where your ideas are valued.",
    salary: "$70K - $80K",
    company: {
      name: "Dolor Cloud",
      description:
        "Dolor Cloud is a leading technology company specializing in digital solutions for businesses of all sizes. With a focus on innovation and customer satisfaction, we are committed to delivering cutting-edge products and services.",
      contactEmail: "contact@dolorsitamet.com",
      contactPhone: "555-555-5555",
    },
  },
  {
    title: "React Front-End Developer",
    type: "Part-Time",
    description:
      "Join our team as a Part-Time Front-End Developer in beautiful Pheonix, AZ. We are looking for a self-motivated individual with a passion for creating engaging user experiences. This position offers flexible hours and the opportunity to work remotely.",
    location: "Pheonix, AZ",
    salary: "$60K - $70K",
    company: {
      name: "Alpha Elite",
      description:
        "Alpha Elite is a dynamic startup specializing in digital marketing and web development. We are committed to fostering a diverse and inclusive workplace where creativity and innovation thrive.",
      contactEmail: "contact@adipisicingelit.com",
      contactPhone: "555-555-5555",
    },
  },
  {
    title: "Full Stack React Developer",
    type: "Full-Time",
    description:
      "Exciting opportunity for a Full-Time Front-End Developer in bustling Atlanta, GA. We are seeking a talented individual with a passion for building elegant and scalable web applications. Join our team and make an impact!",
    location: "Atlanta, GA",
    salary: "$90K - $100K",
    company: {
      name: "Browning Technologies",
      description:
        "Browning Technologies is a rapidly growing technology company specializing in e-commerce solutions. We offer a dynamic and collaborative work environment where employees are encouraged to think creatively and innovate.",
      contactEmail: "contact@consecteturadipisicing.com",
      contactPhone: "555-555-5555",
    },
  },
  {
    title: "React Native Developer",
    type: "Full-Time",
    description:
      "Join our team as a Front-End Developer in beautiful Portland, OR. We are looking for a skilled and enthusiastic individual to help us create innovative web solutions. Competitive salary and great benefits package available.",
    location: "Portland, OR",
    salary: "$100K - $110K",
    company: {
      name: "Port Solutions INC",
      description:
        "Port Solutions is a leading technology company specializing in software development and digital marketing. We are committed to providing our clients with cutting-edge solutions and our employees with a supportive and rewarding work environment.",
      contactEmail: "contact@ipsumlorem.com",
      contactPhone: "555-555-5555",
    },
  },
];
import { toast } from "react-toastify";

const App = () => {
  // const navigate = useNavigate();

  // Add New Job
  const addJob = async (newJob) => {
    await addDoc(collection(db, "jobs"), newJob);
  };

  // Delete Job
  const deleteJob = async (id, navigate) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "jobs", id));
      toast.success("Job deleted successfully");
      navigate("/jobs");
    } catch (error) {
      console.log("error", error);
    }
  };

  // Update Job
  const updateJob = async (job) => {
    await updateDoc(doc(db, "jobs", job.id), job);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
