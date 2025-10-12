"use client";

import { useState } from "react";
import { Search, Users, UserPlus, ScanLine } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { ContactCard } from "@/components/social/ContactCard";
import { ContactDetailModal } from "@/components/social/ContactDetailModal";
import { mockUser, mockContacts, mockSearchableUsers, mockTransactions } from "@/lib/data/mock";
import { Contact, Transaction } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type TabType = "contacts" | "add";

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<TabType>("contacts");
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactsSearchQuery, setContactsSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Filter all searchable users based on search (for Add tab)
  const filteredSearchResults = searchQuery
    ? mockSearchableUsers.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Filter existing contacts (for Contacts tab)
  const filteredMyContacts = contactsSearchQuery
    ? contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(contactsSearchQuery.toLowerCase()) ||
          contact.username.toLowerCase().includes(contactsSearchQuery.toLowerCase())
      )
    : contacts;

  // Check if contact is already added
  const isContactAdded = (contactId: string) => {
    return contacts.some((c) => c.id === contactId);
  };

  // Handle scan QR (placeholder)
  const handleScanQR = () => {
    alert("QR Scanner would open here. In a real app, this would use the device camera to scan QR codes.");
  };

  // Get transactions for a contact
  const getContactTransactions = (contactName: string): Transaction[] => {
    return mockTransactions.filter((t) => t.contact === contactName);
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
    setDetailModalOpen(true);
  };

  const handleSend = (contact: Contact) => {
    // TODO: Navigate to send page with contact pre-filled
    console.log("Send to", contact);
  };

  const handleAddContact = (contact: Contact) => {
    if (!isContactAdded(contact.id)) {
      setContacts([...contacts, contact]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-950 via-dark-900 to-black text-white flex flex-col relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb-green animate-orb-1 top-20 left-10 opacity-20" />
        <div className="orb-dark-green animate-orb-2 bottom-40 right-10 opacity-15" />
        <div className="orb-green animate-orb-3 top-1/2 left-1/2 opacity-10" />
      </div>

      {/* Dot Pattern Overlay */}
      <div className="fixed inset-0 dot-pattern opacity-30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen pb-20">
        {/* Header */}
        <Header user={mockUser} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 py-6">
            {/* Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-center gradient-text mb-2">
                Social
              </h1>
              <p className="text-center text-gray-400 text-sm">
                Connect with friends and send payments
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setActiveTab("contacts")}
                className={cn(
                  "flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                  activeTab === "contacts"
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                )}
              >
                <Users size={18} />
                <span className="text-sm">Contacts</span>
              </button>
              <button
                onClick={() => setActiveTab("add")}
                className={cn(
                  "flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2",
                  activeTab === "add"
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                )}
              >
                <UserPlus size={18} />
                <span className="text-sm">Add Contact</span>
              </button>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "contacts" ? (
                <div>
                  {/* Search Bar for Contacts */}
                  {contacts.length > 0 && (
                    <div className="mb-4">
                      <div className="relative">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={contactsSearchQuery}
                          onChange={(e) => setContactsSearchQuery(e.target.value)}
                          placeholder="Search contacts..."
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {/* Contacts List */}
                  <div className="space-y-3">
                    {filteredMyContacts.length > 0 ? (
                      filteredMyContacts.map((contact) => (
                        <ContactCard
                          key={contact.id}
                          contact={contact}
                          isAdded={true}
                          onClick={() => handleContactClick(contact)}
                          onSend={handleSend}
                        />
                      ))
                    ) : contactsSearchQuery ? (
                      <div className="text-center py-12">
                        <p className="text-gray-400 mb-2">No contacts found</p>
                        <p className="text-sm text-gray-500">
                          Try a different search term
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                          <Users size={32} className="text-gray-600" />
                        </div>
                        <p className="text-gray-400 mb-2">No contacts yet</p>
                        <p className="text-sm text-gray-500">
                          Add people to get started
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  {/* Scan QR Button */}
                  <button
                    onClick={handleScanQR}
                    className="w-full mb-6 px-6 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-glow-md transition-all flex items-center justify-center gap-2"
                  >
                    <ScanLine size={20} />
                    Scan QR Code
                  </button>

                  {/* Divider */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-sm text-gray-400">or search</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  {/* Search Input */}
                  <div className="mb-4">
                    <div className="relative">
                      <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by username, name, or address..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-primary/50 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Search Results */}
                  <div className="space-y-3">
                    {searchQuery ? (
                      filteredSearchResults.length > 0 ? (
                        filteredSearchResults.map((contact) => (
                          <ContactCard
                            key={contact.id}
                            contact={contact}
                            isAdded={isContactAdded(contact.id)}
                            onClick={() => isContactAdded(contact.id) && handleContactClick(contact)}
                            onSend={handleSend}
                            onAdd={handleAddContact}
                          />
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-gray-400 mb-2">No results found</p>
                          <p className="text-sm text-gray-500">
                            Try a different search term
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                          <UserPlus size={32} className="text-gray-600" />
                        </div>
                        <p className="text-gray-400 mb-2">Add new contacts</p>
                        <p className="text-sm text-gray-500">
                          Scan a QR code or search by username
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeTab="social" />
      </div>

      {/* Contact Detail Modal */}
      <ContactDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        contact={selectedContact}
        transactions={selectedContact ? getContactTransactions(selectedContact.name) : []}
      />
    </div>
  );
}
