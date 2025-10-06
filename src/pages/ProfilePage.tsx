import { useState } from "react";
import { User, Phone, Mail, Edit2, LogOut, Camera, Store, MapPin, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { mockBusinesses } from "@/data/mockBusinesses";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    mobile: "+91 9876543210",
    email: "john.doe@example.com",
    avatar: ""
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  
  // Mock user's listings - first 3 businesses for demo
  const [myListings, setMyListings] = useState(mockBusinesses.slice(0, 3));

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleDeleteListing = (id: number) => {
    setMyListings(myListings.filter(listing => listing.id !== id));
    toast.success("Listing deleted successfully!");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-muted/30 py-4 sm:py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Header Card */}
        <Card className="mb-6">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-end mb-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-xl sm:text-2xl bg-primary text-primary-foreground">
                    {getInitials(profile.name)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <CardTitle className="text-xl sm:text-2xl">My Profile</CardTitle>
          </CardHeader>
        </Card>

        {/* Tabs for Profile and Listings */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
              <span className="sm:hidden">Info</span>
            </TabsTrigger>
            <TabsTrigger value="listings" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              <span className="hidden sm:inline">My Listings</span>
              <span className="sm:hidden">Listings</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardContent className="pt-6 space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={isEditing ? editedProfile.name : profile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    disabled={!isEditing}
                    className="text-base"
                  />
                </div>

                {/* Mobile Field */}
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    Mobile Number
                  </Label>
                  <Input
                    id="mobile"
                    value={isEditing ? editedProfile.mobile : profile.mobile}
                    onChange={(e) => setEditedProfile({ ...editedProfile, mobile: e.target.value })}
                    disabled={!isEditing}
                    className="text-base"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={isEditing ? editedProfile.email : profile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                    disabled={!isEditing}
                    className="text-base"
                  />
                </div>

                <Separator className="my-6" />

                {/* Action Buttons */}
                <div className="flex gap-3 flex-col sm:flex-row">
                  {!isEditing ? (
                    <Button
                      onClick={handleEdit}
                      className="w-full"
                      size="lg"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleSave}
                        className="w-full"
                        size="lg"
                      >
                        Save Changes
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="w-full"
                        size="lg"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Listings Tab */}
          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-lg sm:text-xl">My Business Listings</CardTitle>
                  <Button variant="cta" size="sm" asChild>
                    <Link to="/list-business">
                      <Store className="h-4 w-4 mr-2" />
                      Add New
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {myListings.length === 0 ? (
                  <div className="text-center py-12">
                    <Store className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">You don't have any listings yet</p>
                    <Button variant="cta" asChild>
                      <Link to="/list-business">Create Your First Listing</Link>
                    </Button>
                  </div>
                ) : (
                  myListings.map((listing) => (
                    <Card key={listing.id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row gap-4 p-4">
                        {/* Image */}
                        <div className="w-full sm:w-32 h-32 sm:h-24 flex-shrink-0 overflow-hidden rounded-lg">
                          <img
                            src={listing.image}
                            alt={listing.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-base sm:text-lg line-clamp-1">
                                {listing.name}
                              </h3>
                              <Badge variant="secondary" className="mt-1">
                                {listing.category}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 text-sm flex-shrink-0">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="font-medium">{listing.rating}</span>
                              <span className="text-muted-foreground">({listing.reviews})</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="line-clamp-1">{listing.address}</span>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 flex-wrap">
                            <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
                              <Link to={`/business/${listing.id}`}>
                                <Edit2 className="h-3 w-3 mr-1" />
                                Edit
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteListing(listing.id)}
                              className="flex-1 sm:flex-none text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
