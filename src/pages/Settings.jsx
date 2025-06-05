"use client"

import { useState } from "react"
import { 
  User,
  CreditCard,
  MessageSquare,
  Video,
  Palette,
  Bell,
  Calendar,
  Clock,
  Music,
  Edit,
  Trash2,
  Check,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Settings() {
  // Menu items data
  const menuItems = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" />, active: true },
    { id: "account", label: "Account", icon: <CreditCard className="w-4 h-4" /> },
    { id: "chat", label: "Chat", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "voice-video", label: "Voice & video", icon: <Video className="w-4 h-4" /> },
    { id: "appearance", label: "Appearance", icon: <Palette className="w-4 h-4" /> },
    { id: "notification", label: "Notification", icon: <Bell className="w-4 h-4" /> },
  ]

  // Profile data
  const [profileData, setProfileData] = useState({
    name: "Kevin Heart",
    username: "kevinunhuy",
    profileUrl: "https://www.kevinunhuy.com",
    nextChangeDate: "25/04/2024",
    status: "Status recently",
    availability: "On duty",
    bio: "Discuss only on work hour, unless you wanna discuss about music 💤",
    notifications: true,
    darkMode: false
  })

  const [activeTab, setActiveTab] = useState("profile")
  const [editingField, setEditingField] = useState(null)
  const [editValue, setEditValue] = useState("")

  const handleEditStart = (field, value) => {
    setEditingField(field)
    setEditValue(value)
  }

  const handleEditSave = () => {
    if (editingField) {
      setProfileData(prev => ({ ...prev, [editingField]: editValue }))
    }
    setEditingField(null)
  }

  const handleEditCancel = () => {
    setEditingField(null)
  }

  return (
    <div className="flex h-[80vh] bg-gray-50 rounded-lg shadow-lg overflow-hidden m-3">
      {/* Sidebar Navigation */}
      <div className="w-64 border-r bg-white p-4 rounded-l-lg">
        <h1 className="text-xl font-bold mb-6">Settings</h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center w-full p-2 rounded-md ${activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 overflow-y-auto bg-white rounded-r-lg border-t border-r border-b">
        {activeTab === "profile" && (
          <div className="max-w-3xl mx-auto">
            {/* Profile Picture Section */}
            <div className="mb-1 border-b pb-1">
              <h2 className="text-lg font-semibold mb-4">Profile picture</h2>
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 border-2 border-gray-200">
                  <AvatarImage src="https://github.com/kevinheart.png" />
                  <AvatarFallback>KH</AvatarFallback>
                </Avatar>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Change picture
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete picture
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Profile Name */}
              <div className="border-b pb-6">
                <h3 className="text-sm font-medium mb-2">Profile name</h3>
                {editingField === 'name' ? (
                  <div className="flex items-center gap-2">
                    <Input 
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-64"
                    />
                    <Button size="sm" onClick={handleEditSave}>
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleEditCancel}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-lg">{profileData.name}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditStart('name', profileData.name)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Username */}
              <div className="border-b pb-6">
                <h3 className="text-sm font-medium mb-2">Username</h3>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 hover:underline">
                    @{profileData.username}
                  </span>
                  <span className="text-sm text-gray-500">
                    (Available change in {profileData.nextChangeDate})
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="border-b pb-6">
                <h3 className="text-sm font-medium mb-2">Status recently</h3>
                <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                  {profileData.availability}
                </Badge>
              </div>

              {/* About Me */}
              <div className="border-b pb-6">
                <h3 className="text-sm font-medium mb-2">About me</h3>
                {editingField === 'bio' ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleEditSave}>
                        <Check className="w-4 h-4 mr-1" /> Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleEditCancel}>
                        <X className="w-4 h-4 mr-1" /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-gray-700">
                    <Music className="w-4 h-4 mt-1 flex-shrink-0" />
                    <p>{profileData.bio}</p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditStart('bio', profileData.bio)}
                      className="ml-2"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "account" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-lg font-semibold">Account Settings</h2>
            
            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive email notifications</p>
                </div>
                <Switch 
                  checked={profileData.notifications}
                  onCheckedChange={(checked) => setProfileData({...profileData, notifications: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-gray-500">Enable dark theme</p>
                </div>
                <Switch 
                  checked={profileData.darkMode}
                  onCheckedChange={(checked) => setProfileData({...profileData, darkMode: checked})}
                />
              </div>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="font-medium mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" className="mt-1" />
                </div>
                <Button>Update Password</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notification" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-lg font-semibold">Notification Settings</h2>
            
            <div className="border rounded-lg p-6 space-y-6">
              <div>
                <h3 className="font-medium mb-2">Course Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm">New Assignments</h4>
                      <p className="text-xs text-gray-500">Notify when new assignments are posted</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm">Deadline Reminders</h4>
                      <p className="text-xs text-gray-500">Remind before assignment deadlines</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">System Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm">Maintenance Alerts</h4>
                      <p className="text-xs text-gray-500">Notify about system maintenance</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm">Feature Updates</h4>
                      <p className="text-xs text-gray-500">Notify about new features</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}