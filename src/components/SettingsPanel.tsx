import { useState } from 'react';
import { User, Bell, Shield, CreditCard, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SettingsPanelProps {
  user: any;
}

export function SettingsPanel({ user }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'subscription'>('profile');
  const [showPassword, setShowPassword] = useState(false);

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved');
  };

  const handleChangePassword = () => {
    toast.success('Password changed successfully');
  };

  return (
    <div className="p-8">
      <div className="flex gap-6">
        {/* Settings Navigation */}
        <div className="w-64">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                activeTab === 'notifications' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-1 ${
                activeTab === 'security' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Shield className="w-5 h-5" />
              <span>Security</span>
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'subscription' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Subscription</span>
            </button>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-6">Profile Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Change Photo
                  </button>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <div className="text-gray-900 mb-1">Price Alerts</div>
                    <p className="text-gray-600">Get notified when stocks reach your target price</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <div className="text-gray-900 mb-1">Learning Progress</div>
                    <p className="text-gray-600">Updates on your course completions and achievements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <div className="text-gray-900 mb-1">Market News</div>
                    <p className="text-gray-600">Daily market updates and trending stocks</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <div className="text-gray-900 mb-1">Email Newsletter</div>
                    <p className="text-gray-600">Weekly trading tips and educational content</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <button
                  onClick={handleSaveNotifications}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-900 mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">New Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={handleChangePassword}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Change Password
                </button>

                <div className="pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-gray-900 mb-1">Two-Factor Authentication</div>
                      <p className="text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-gray-900 mb-4">Current Plan</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-900 mb-1 capitalize">{user.subscription} Plan</div>
                    <p className="text-gray-600">
                      {user.subscription === 'free' 
                        ? 'Limited access to basic features' 
                        : 'Full access to all features'}
                    </p>
                  </div>
                  {user.subscription === 'free' && (
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Upgrade
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="text-gray-600 mb-2">Free Plan</div>
                  <div className="text-gray-900 mb-4">$0/month</div>
                  <ul className="space-y-2 mb-6 text-gray-700">
                    <li>• Basic lessons</li>
                    <li>• Virtual trading ($50k)</li>
                    <li>• Limited analytics</li>
                    <li>• Community access</li>
                  </ul>
                  <button 
                    disabled={user.subscription === 'free'}
                    className="w-full py-2 border border-gray-300 rounded-lg disabled:opacity-50"
                  >
                    Current Plan
                  </button>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-6">
                  <div className="mb-2">Pro Plan</div>
                  <div className="mb-4">$19.99/month</div>
                  <ul className="space-y-2 mb-6">
                    <li>• All lessons & quizzes</li>
                    <li>• Virtual trading ($500k)</li>
                    <li>• Advanced analytics</li>
                    <li>• Real-time data</li>
                    <li>• Priority support</li>
                  </ul>
                  <button className="w-full py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50">
                    Upgrade Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
