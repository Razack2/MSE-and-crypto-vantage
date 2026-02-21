import { useState } from 'react';
import { Plus, Edit, Trash2, Users, BookOpen, FileText, BarChart } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'articles' | 'users'>('overview');
  const [showAddLesson, setShowAddLesson] = useState(false);

  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'blue' },
    { label: 'Active Lessons', value: '24', icon: BookOpen, color: 'green' },
    { label: 'Published Articles', value: '156', icon: FileText, color: 'purple' },
    { label: 'Completion Rate', value: '68%', icon: BarChart, color: 'orange' },
  ];

  const lessons = [
    { id: 1, title: 'What are Stocks?', status: 'published', students: 543, rating: 4.8 },
    { id: 2, title: 'Understanding Market Orders', status: 'published', students: 432, rating: 4.6 },
    { id: 3, title: 'Reading Stock Charts', status: 'draft', students: 0, rating: 0 },
    { id: 4, title: 'Technical Indicators', status: 'published', students: 298, rating: 4.9 },
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', subscription: 'pro', joined: '2024-10-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', subscription: 'free', joined: '2024-11-01' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', subscription: 'pro', joined: '2024-09-20' },
  ];

  const colorMap: Record<string, { bg: string; text: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
    gray: { bg: 'bg-gray-100', text: 'text-gray-700' },
  };

  const handleDeleteLesson = (id: number) => {
    toast.success('Lesson deleted successfully');
  };

  const handleSaveLesson = () => {
    toast.success('Lesson created successfully');
    setShowAddLesson(false);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Overview */}
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              const color = colorMap[stat.color] || colorMap.gray;
              return (
                <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">{stat.label}</span>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color.bg}`}>
                      <Icon className={`w-5 h-5 ${color.text}`} />
                    </div>
                  </div>
                  <div className="text-gray-900">{stat.value}</div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-6">
            <button
              type="button"
              onClick={() => setActiveTab('lessons')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 text-left hover:from-blue-700 hover:to-blue-800"
            >
              <BookOpen className="w-8 h-8 mb-3" />
              <div className="mb-1">Manage Lessons</div>
              <p className="text-blue-100">Create and edit course content</p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('articles')}
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-6 text-left hover:from-purple-700 hover:to-purple-800"
            >
              <FileText className="w-8 h-8 mb-3" />
              <div className="mb-1">Manage Articles</div>
              <p className="text-purple-100">Publish educational content</p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('users')}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 text-left hover:from-green-700 hover:to-green-800"
            >
              <Users className="w-8 h-8 mb-3" />
              <div className="mb-1">Manage Users</div>
              <p className="text-green-100">View and manage user accounts</p>
            </button>
          </div>

          <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <div className="text-gray-900">New user registration: john@example.com</div>
                  <div className="text-gray-600">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                  <div className="text-gray-900">Lesson "Technical Indicators" completed by 15 users</div>
                  <div className="text-gray-600">5 hours ago</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-900">New article published: "Market Trends 2024"</div>
                  <div className="text-gray-600">1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Lessons */}
      {activeTab === 'lessons' && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Lesson Management</h2>
            <button
              type="button"
              onClick={() => setShowAddLesson(!showAddLesson)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Add Lesson
            </button>
          </div>

          {showAddLesson && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h3 className="text-gray-900 mb-4">Create New Lesson</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Lesson title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Lesson description"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      placeholder="e.g., 20 min"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Level</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleSaveLesson}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Lesson
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddLesson(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-200 overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-700">Title</th>
                  <th className="text-left py-3 px-4 text-gray-700">Status</th>
                  <th className="text-right py-3 px-4 text-gray-700">Students</th>
                  <th className="text-right py-3 px-4 text-gray-700">Rating</th>
                  <th className="text-right py-3 px-4 text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {lessons.map((lesson) => (
                  <tr key={lesson.id} className="border-t border-gray-200">
                    <td className="py-4 px-4 text-gray-900">{lesson.title}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded capitalize ${
                        lesson.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {lesson.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-gray-900">{lesson.students}</td>
                    <td className="py-4 px-4 text-right text-gray-900">
                      {lesson.rating > 0 ? lesson.rating.toFixed(1) : '-'}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button type="button" className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteLesson(lesson.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Users */}
      {activeTab === 'users' && (
        <>
          <h2 className="text-gray-900 mb-6">User Management</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-gray-700">Subscription</th>
                  <th className="text-left py-3 px-4 text-gray-700">Joined</th>
                  <th className="text-right py-3 px-4 text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t border-gray-200">
                    <td className="py-4 px-4 text-gray-900">{user.name}</td>
                    <td className="py-4 px-4 text-gray-900">{user.email}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded capitalize ${
                        user.subscription === 'pro'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.subscription}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{user.joined}</td>
                    <td className="py-4 px-4 text-right">
                      <button type="button" className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Articles */}
      {activeTab === 'articles' && (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Article Management</h2>
            <button type="button" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="w-5 h-5" />
              Add Article
            </button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No articles yet. Create your first article to get started.</p>
          </div>
        </>
      )}
    </div>
  );
}
