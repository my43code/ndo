"use client";

import Image from "next/image";
import { useState } from "react";

const emptyMember = { name: "", role: "", bio: "", image: "" };
const inputClass = "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900";

async function resizePortrait(file) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 10 * 1024 * 1024) {
    throw new Error("Choose a JPG, PNG or WebP image under 10 MB.");
  }
  const image = await createImageBitmap(file);
  try {
    const ratio = Math.min(1, 640 / Math.max(image.width, image.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * ratio));
    canvas.height = Math.max(1, Math.round(image.height * ratio));
    canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/webp", 0.8);
  } finally {
    image.close();
  }
}

export default function TeamEditor({ about, onPublished }) {
  const [form, setForm] = useState(emptyMember);
  const [editingId, setEditingId] = useState(null);
  const [working, setWorking] = useState(false);
  const [status, setStatus] = useState(null);
  const members = about.team ?? [];

  function resetForm() {
    setForm(emptyMember);
    setEditingId(null);
  }

  async function publish(team, message) {
    setStatus(null);
    setWorking(true);
    try {
      if (!about.updatedAt) throw new Error("Reload the dashboard before publishing a profile.");
      const response = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team, expectedUpdatedAt: about.updatedAt }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to publish the team.");
      onPublished(result.about);
      setStatus({ message });
      return true;
    } catch (error) {
      setStatus({ message: error.message, error: true });
      return false;
    } finally {
      setWorking(false);
    }
  }

  async function saveMember(event) {
    event.preventDefault();
    const member = { ...form, name: form.name.trim(), role: form.role.trim(), bio: form.bio.trim() };
    if (!member.name || !member.role) {
      setStatus({ message: "Enter the team member's name and role.", error: true });
      return;
    }
    const team = editingId
      ? members.map((entry) => entry._id === editingId ? { ...entry, ...member } : entry)
      : [...members, member];
    if (await publish(team, "Profile published on the About page.")) resetForm();
  }

  async function choosePhoto(event) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;
    setWorking(true);
    setStatus(null);
    try {
      const image = await resizePortrait(file);
      setForm((current) => ({ ...current, image }));
    } catch (error) {
      setStatus({ message: error.message || "Unable to open the photo.", error: true });
    } finally {
      input.value = "";
      setWorking(false);
    }
  }

  return (
    <div className="grid gap-6 text-slate-900 lg:grid-cols-2">
      <form onSubmit={saveMember} className="rounded-xl border border-slate-200 bg-white p-6">
        <fieldset disabled={working} className="space-y-4">
          <legend className="mb-4 text-xl font-semibold">{editingId ? "Edit team profile" : "Add team profile"}</legend>
          <label className="block text-sm font-medium">
            Name
            <input className={inputClass} required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label className="block text-sm font-medium">
            Role
            <input className={inputClass} required maxLength={120} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </label>
          <label className="block text-sm font-medium">
            Bio (optional)
            <textarea className={inputClass} rows={4} maxLength={600} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
          </label>
          <label className="block text-sm font-medium">
            Photo (optional)
            <input className={inputClass} type="file" accept="image/jpeg,image/png,image/webp" onChange={choosePhoto} />
          </label>
          {form.image && (
            <div className="flex items-center gap-3">
              <Image src={form.image} alt="Profile photo preview" width={64} height={64} unoptimized className="h-16 w-16 rounded-lg object-cover" />
              <button type="button" className="text-sm font-medium text-slate-700 underline" onClick={() => setForm({ ...form, image: "" })}>
                Remove photo
              </button>
            </div>
          )}
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white disabled:opacity-60">
              {working ? "Working…" : "Publish profile"}
            </button>
            {editingId && <button type="button" className="px-3 py-2 text-sm" onClick={resetForm}>Cancel edit</button>}
          </div>
        </fieldset>
        {status && (
          <p role={status.error ? "alert" : "status"} className={`mt-4 text-sm ${status.error ? "text-red-700" : "text-emerald-800"}`}>
            {status.message}
          </p>
        )}
      </form>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold">Published team</h2>
          {members.length > 0 && (
            <a href="/about#team" className="text-sm font-medium text-emerald-800 underline">View on website</a>
          )}
        </div>
        {members.length ? (
          <ul className="mt-4 divide-y divide-slate-200">
            {members.map((member) => (
              <li key={member._id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-slate-600">{member.role}</p>
                </div>
                <div className="flex gap-3 text-sm font-medium">
                  <button type="button" disabled={working} onClick={() => {
                    setEditingId(member._id);
                    setForm(Object.fromEntries(Object.keys(emptyMember).map((key) => [key, member[key] ?? ""])));
                    setStatus(null);
                  }}>Edit</button>
                  <button type="button" disabled={working} className="text-red-700" onClick={async () => {
                    if (!window.confirm(`Remove ${member.name} from the website?`)) return;
                    if (await publish(members.filter(({ _id }) => _id !== member._id), "Profile removed from the About page.") && editingId === member._id) resetForm();
                  }}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        ) : <p className="mt-4 text-sm text-slate-600">No team profiles published yet.</p>}
      </section>
    </div>
  );
}
