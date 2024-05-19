import { auth, authenticateUser } from "@/services/firebase";
import { sendPasswordResetEmail, User } from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";
import { useOrg } from "./org";
import { useProject } from "./project";
import { getApi } from "@/api/apis";
import { useNavigate } from "react-router-dom";

interface AuthContextValue {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  resetPassword: (email: string) => Promise<any>;
  updatePassword: (password: string) => Promise<any>;
}

const AuthContext = React.createContext<AuthContextValue>({
  currentUser: null,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  updatePassword: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: any }) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isOrgAvailable, setIsOrgAvailable] = useState(false);
  const [isProjectAvailable, setIsProjectAvailable] = useState(false);
  const { setOrg, setUserOrgs } = useOrg();
  const { setProject, setUserProjects } = useProject();

  function signup(email: string, password: string) {
    return authenticateUser(email, password, false);
  }

  function login(email: string, password: string) {
    return authenticateUser(email, password, true);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function updatePassword(password: string) {
    if (currentUser === null) return;
    return currentUser.updatePassword(password);
  }
  const resetOrgAndProjects = () => {
    setOrg({ id: "", name: "" });
    setProject({ id: "", name: "" });
    setIsProjectAvailable(false);
  };
  const getUserDetails = async (uid: string) => {
    try {
      const res = await getApi("/user/" + uid);
      const { projects, orgs } = res.data;
      setUserProjects(
        projects.map((project: any) => ({
          id: project._id,
          name: project.name,
        }))
      );
      setUserOrgs(
        orgs.map((org: any) => ({
          id: org._id,
          name: org.name,
        }))
      );
      if (orgs.length > 0) {
        setOrg({ id: orgs[0]._id, name: orgs[0].name });
        setIsOrgAvailable(true);
      }

      if (projects.length > 0) {
        setProject({ id: projects[0]._id, name: projects[0].name });
        setIsProjectAvailable(true);
      }
    } catch (e) {
      auth.signOut();
    }
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
      if (user) {
        getUserDetails(user.uid);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user);
      if (user) {
        getUserDetails(user.uid);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
