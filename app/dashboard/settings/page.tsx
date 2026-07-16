"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/app/components/Sidebar";
import TopBar from "@/app/components/TopBar";
import CreateLinkModal from "@/app/components/CreateLinkModal";
import { useLinkState } from "@/app/lib/state";
import { AlertCircle, Calendar, CalendarIcon, Camera, CheckCircle, Clock, Edit2, LogOut, Mail, Phone, Save, Shield, User, User2Icon, UserCheck, Users, X } from "lucide-react";
import { MdAddCircle, MdArrowForward, MdContentCopy, MdDelete, MdLanguage, MdRefresh, MdVpnKey } from "react-icons/md";
import { getProfile } from "@/app/api/auth/getProfile";
import { updateProfile } from "@/app/api/auth/updateProfile";
export default function SettingsPage() {
const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    countryCode: '',
    dob: '',
    gender: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      
      const response = await getProfile(token);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const userData = data.user;
        setUser(userData);
        
        let formattedDob = '';
        if (userData.dob) {
          const date = new Date(userData.dob);
          formattedDob = date.toISOString().split('T')[0];
        }

        setFormData({
          name: userData.name || '',
          mobileNumber: userData.mobileNumber || '',
          countryCode: userData.countryCode || '+91',
          dob: formattedDob,
          gender: userData.gender || ''
        });
      } else {
        setError(data.message || 'Failed to load profile');
      }
    } catch (error:any) {
      console.error('Error fetching profile:', error);
      if (error.message === 'Failed to fetch') {
        setError('Cannot connect to server. Please check if backend is running.');
      } else {
        setError('Failed to load profile data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
      
      const response = await updateProfile(token,formData);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setSuccess('Profile updated successfully!');
        setTimeout(() => {
          setIsEditing(false);
          setSuccess(null);
        }, 2000);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
    setSuccess(null);
    if (user) {
      let formattedDob = '';
      if (user.dob) {
        const date = new Date(user.dob);
        formattedDob = date.toISOString().split('T')[0];
      }
      setFormData({
        name: user.name || '',
        mobileNumber: user.mobileNumber || '',
        countryCode: user.countryCode || '+91',
        dob: formattedDob,
        gender: user.gender || ''
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return 'Not set';
    }
  };

  const formatMemberSince = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  const formatLastLogin = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main Content Workspace */}
      <div className="md:pl-64 flex flex-col flex-grow min-h-screen">
        <TopBar />

        {/* Content Canvas */}
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 md:py-12">
                <div className="flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">
                          {getInitials(user?.name)}
                        </span>
                      </div>
                      <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-lg hover:bg-gray-50 transition-colors">
                        <Camera className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold text-white">{user?.name || 'User'}</h1>
                      <p className="text-blue-100 flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 md:mt-0 px-6 py-2.5 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center gap-2 shadow-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Notifications */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">Error</p>
                  <p className="text-red-700">{error}</p>
                </div>
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">Success</p>
                  <p className="text-green-700">{success}</p>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 md:p-8">
                {isEditing ? (
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            required
                            placeholder="Enter your full name"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            value={user?.email || ''}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                            disabled
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 ml-1">Email cannot be changed</p>
                      </div>

                      {/* Phone Number */}
                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="flex gap-3">
                          <div className="relative w-24">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              name="countryCode"
                              value={formData.countryCode}
                              onChange={handleChange}
                              className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                              placeholder="+91"
                            />
                          </div>
                          <div className="flex-1 relative">
                            <input
                              type="tel"
                              name="mobileNumber"
                              value={formData.mobileNumber}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                              placeholder="Enter phone number"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                          />
                        </div>
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Gender
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 appearance-none"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer not to say">Prefer not to say</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row gap-3 pt-6 border-t-2">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            Save Changes
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <X className="w-5 h-5" />
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  // Display Mode
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Profile Information */}
                      <div className="space-y-6">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-blue-50 rounded-lg">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Full Name</p>
                            <p className="text-lg font-semibold text-gray-900">{user?.name || 'Not set'}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-purple-50 rounded-lg">
                            <Mail className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="text-lg font-semibold text-gray-900">{user?.email || 'Not set'}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-green-50 rounded-lg">
                            <Phone className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Phone Number</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {user?.countryCode && user?.mobileNumber
                                ? `${user.countryCode} ${user.mobileNumber}`
                                : 'Not set'}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-orange-50 rounded-lg">
                            <CalendarIcon className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                            <p className="text-lg font-semibold text-gray-900">{formatDate(user?.dob)}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-pink-50 rounded-lg">
                            <Users className="w-5 h-5 text-pink-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Gender</p>
                            <p className="text-lg font-semibold text-gray-900 capitalize">{user?.gender || 'Not Set'}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-yellow-50 rounded-lg">
                            <Shield className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Account Status</p>
                            <div className="mt-1">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${user?.emailVerified
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                {user?.emailVerified ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-1.5" />
                                    Verified
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="w-4 h-4 mr-1.5" />
                                    Not Verified
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 pt-6 border-t-2 border-gray-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>
                            <span className="font-medium">Member Since:</span>{' '}
                            {formatMemberSince(user?.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <UserCheck className="w-4 h-4 text-gray-400" />
                          <span>
                            <span className="font-medium">Last Login:</span>{' '}
                            {formatLastLogin(user?.lastLoginAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

        
          </div>
        </div>
      </div>

      {/* Global Link Creator Dialog */}
      <CreateLinkModal />
    </div>
  );
}

