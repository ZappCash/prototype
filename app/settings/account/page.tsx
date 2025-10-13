"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Camera, Edit2, Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/Toast";

export default function AccountDetailsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState("@zappcash_user");
  const [bio, setBio] = useState("Crypto enthusiast and early adopter");
  const [phone, setPhone] = useState("+506 1234 5678");
  const [email, setEmail] = useState("user@zappcash.com");
  const [profileImage, setProfileImage] = useState<string | null>("https://api.dicebear.com/7.x/avataaars/svg?seed=default&backgroundColor=00ff88,00cc66");
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleImageClick = () => {
    if (isEditMode) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // TODO: Save account details to backend
    console.log({ username, bio, phone, email, profileImage });

    setIsSaving(false);
    setIsEditMode(false);
    setShowToast(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Optionally reset values to original
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-black text-white flex flex-col relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb-green animate-orb-1 top-20 left-10 opacity-20" />
        <div className="orb-dark-green animate-orb-2 bottom-40 right-10 opacity-15" />
      </div>

      {/* Dot Pattern Overlay */}
      <div className="fixed inset-0 dot-pattern opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-2xl font-bold text-white">Account</h1>
          </div>
          {!isEditMode && (
            <button
              onClick={() => setIsEditMode(true)}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors flex items-center gap-2"
            >
              <Edit2 size={16} />
              Edit
            </button>
          )}
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 pb-24">
          <div className="max-w-md mx-auto space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="relative">
                <img
                  src={profileImage || "https://api.dicebear.com/7.x/avataaars/svg?seed=default&backgroundColor=00ff88,00cc66"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary/30 bg-gradient-to-br from-primary/20 to-secondary/20"
                />
                {isEditMode && (
                  <button
                    onClick={handleImageClick}
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors"
                  >
                    <Camera size={16} className="text-black" />
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              {isEditMode && (
                <p className="text-xs text-gray-400">Click the camera icon to change photo</p>
              )}
            </div>

            {/* Account Info */}
            {!isEditMode ? (
              // View Mode - Minimalista
              <div className="space-y-4">
                {/* Username */}
                <div className="glass-card p-5 rounded-2xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-400 mb-1">Username</p>
                      <p className="text-white font-medium">{username}</p>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {bio && (
                  <div className="glass-card p-5 rounded-2xl border border-white/10">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Edit2 size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Bio</p>
                        <p className="text-white font-medium">{bio}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Phone */}
                {phone && (
                  <div className="glass-card p-5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Phone Number</p>
                        <p className="text-white font-medium">{phone}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Email */}
                {email && (
                  <div className="glass-card p-5 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-400 mb-1">Email</p>
                        <p className="text-white font-medium">{email}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Edit Mode - Form
              <div className="space-y-4">
                {/* Username */}
                <div className="glass-card p-4 rounded-2xl border border-white/10">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="@username"
                  />
                </div>

                {/* Bio */}
                <div className="glass-card p-4 rounded-2xl border border-white/10">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    maxLength={150}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="Tell us about yourself..."
                  />
                  <p className="text-xs text-gray-500 mt-2">{bio.length}/150</p>
                </div>

                {/* Phone */}
                <div className="glass-card p-4 rounded-2xl border border-white/10">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="+506 1234 5678"
                  />
                </div>

                {/* Email */}
                <div className="glass-card p-4 rounded-2xl border border-white/10">
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleCancel}
                    disabled={isSaving}
                    className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        message="Account details saved successfully!"
      />
    </div>
  );
}
