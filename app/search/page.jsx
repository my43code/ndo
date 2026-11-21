"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowLeft } from "lucide-react";
import LoadingState from "@/components/LoadingState";

function matchesQuery(item, query) {
  const lowerQuery = (query || "").toString().toLowerCase().trim();
  if (!lowerQuery) return false;

  const values = [];
  Object.values(item).forEach((value) => {
    if (typeof value === "string") {
      values.push(value.toLowerCase());
    } else if (Array.isArray(value)) {
      values.push(value.join(" ").toLowerCase());
    } else if (typeof value === "object" && value !== null) {
      values.push(JSON.stringify(value).toLowerCase());
    }
  });

  const haystack = values.join(" ");
  if (haystack.includes(lowerQuery)) {
    return true;
  }

  const tokens = lowerQuery.split(/\s+/).filter(Boolean);
  return tokens.some((token) => haystack.includes(token));
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [servicesRes, projectsRes, postsRes, aboutRes] =
          await Promise.all([
            fetch("/api/services?summary=1"),
            fetch("/api/projects?summary=1", { cache: "no-store" }),
            fetch("/api/posts?summary=1"),
            fetch("/api/about", { cache: "no-store" }),
          ]);

        const servicesData = servicesRes.ok ? await servicesRes.json() : [];
        const projectsData = projectsRes.ok ? await projectsRes.json() : [];
        const postsData = postsRes.ok
          ? await postsRes.json()
          : { posts: [] };
        const aboutData = aboutRes.ok ? await aboutRes.json() : null;

        setServices(servicesData);
        setProjects(projectsData);
        setPosts(postsData.posts || []);
        setAbout(aboutData);
      } catch (error) {
        console.error("Search data loading failed:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleSearch = () => {
    setSearchTerm(query.trim());
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const filteredServices = useMemo(() => {
    return services.filter((item) =>
      matchesQuery(
        {
          title: item.title,
          description: item.description,
          shortDescription: item.shortDescription,
          link: item.link,
        },
        searchTerm
      )
    );
  }, [services, searchTerm]);

  const filteredProjects = useMemo(() => {
    return projects.filter((item) =>
      matchesQuery(
        {
          title: item.title,
          description: item.description,
          shortDescription: item.shortDescription,
          link: item.link,
        },
        searchTerm
      )
    );
  }, [projects, searchTerm]);

  const filteredPosts = useMemo(() => {
    return posts.filter((item) =>
      matchesQuery(
        {
          title: item.title,
          summary: item.summary,
          content: item.content,
        },
        searchTerm
      )
    );
  }, [posts, searchTerm]);

  const aboutMatches = useMemo(() => {
    if (!about) return false;
    return matchesQuery(
      {
        history: about.history?.text,
        mission: about.mission,
        vision: about.vision,
        values: about.values,
        team: about.team?.map((member) => `${member.name} ${member.role}`),
      },
      searchTerm
    );
  }, [about, searchTerm]);

  return (
    <section className="page-hero relative min-h-screen overflow-hidden bg-slate-950 px-6 py-12">
      <div className="absolute -right-20 top-32 h-64 w-64 rounded-full bg-emerald-500/4 blur-[100px] animate-float-gentle" />
      <div className="absolute left-10 bottom-20 h-40 w-40 rounded-full bg-sky-500/3 blur-[60px] animate-float-slow" />

      <div className="relative mx-auto max-w-6xl">
        <div className="hero-fade-up mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="hero-text-float text-3xl font-black text-white">Search</h1>
            <p className="hero-fade-up-delay-2 mt-2 text-slate-400">
              Search across services, projects, posts, and about content.
            </p>
          </div>
          <Link
            href="/"
            className="hero-fade-up-delay-2 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        <div className="hero-fade-up-delay-3 mb-10 flex flex-col items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-4 shadow-xl shadow-black/10 backdrop-blur md:flex-row">
          <div className="flex w-full flex-1 items-center gap-3">
            <Search className="text-slate-500" size={20} />
            <input
              type="text"
              placeholder="Search for any word or phrase..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent text-white outline-none placeholder:text-slate-600"
            />
          </div>
          <button
            type="button"
            onClick={handleSearch}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-2.5 font-bold text-white transition-all hover:brightness-110"
          >
            Search
          </button>
        </div>

        {!loading ? (
          searchTerm &&
          filteredServices.length === 0 &&
          filteredProjects.length === 0 &&
          filteredPosts.length === 0 &&
          !aboutMatches ? (
            <p className="mb-6 text-slate-500">
              No matches found for &quot;{searchTerm}&quot;.
            </p>
          ) : searchTerm ? (
            <p className="mb-6 text-slate-400">
              Search results for &quot;{searchTerm}&quot;
            </p>
          ) : (
            <p className="mb-6 text-slate-500">
              Enter a word or phrase and click Search.
            </p>
          )
        ) : null}

        {loading ? (
          <LoadingState
            eyebrow="Search"
            title="Loading search data"
            subtitle="Pulling data from the database."
          />
        ) : (
          <>
            <section className="mb-12">
              <h2 className="mb-4 text-xl font-bold text-white">Services</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <div
                      key={service._id}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5"
                    >
                      <h3 className="text-lg font-bold text-white">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-400">
                        {service.description || service.shortDescription}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">No matching services.</p>
                )}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 text-xl font-bold text-white">Projects</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <div
                      key={project._id}
                      className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/5"
                    >
                      <Image
                        src={project.image || "/images/project1.webp"}
                        width={400}
                        height={250}
                        alt={project.title || "Project"}
                        className="h-[220px] w-full rounded-xl object-cover"
                      />
                      <h3 className="mt-4 text-lg font-bold text-white">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-400">
                        {project.description || project.shortDescription}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">No matching projects.</p>
                )}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="mb-4 text-xl font-bold text-white">Posts</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <div
                      key={post._id}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
                    >
                      <h3 className="text-lg font-bold text-white">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-400">
                        {post.summary}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500">No matching posts.</p>
                )}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-bold text-white">About</h2>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                {aboutMatches ? (
                  <div>
                    <p className="text-slate-300">
                      Your search matches content from the About page.
                    </p>
                    <p className="mt-2 text-slate-500">
                      Try searching company mission, team names,
                      or values.
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-500">
                    No matching About content found.
                  </p>
                )}
              </div>
            </section>
          </>
        )}
      </div>
    </section>
  );
}
