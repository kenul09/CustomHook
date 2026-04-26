import React from "react";
import { Spinner, Button, Row, Col, Container, Badge, Stack } from "react-bootstrap";
import { useFetchData } from "../hooks/useFetchData";
import { useAddItem } from "../hooks/useAddItem";
import { toast } from "react-toastify";

export default function RecipesManager() {
  const { data: users, loading: uLoading } = useFetchData("users");
  const { data: photos, loading: pLoading } = useFetchData("photos");

  const { localItems: localDatas, addItem: addUserData } = useAddItem();
  const { localItems: localImgs, addItem: addImgData } = useAddItem();

  const handleAddUser = (user) => {
    const exists = localDatas.find((u) => u.id === user.id);
    if (!exists) {
      addUserData(user);
      toast.success(`${user.name} əlavə edildi!`, { icon: "🚀" });
    } else {
      toast.warning("Artıq siyahıda var!", { icon: "⚠️" });
    }
  };

  const handleAddPhoto = (photo, dynamicUrl) => {
    const exists = localImgs.find((img) => img.id === photo.id);
    if (!exists) {
      addImgData({ ...photo, thumbnailUrl: dynamicUrl });
      toast.info("Şəkil kolleksiyaya əlavə edildi!", { icon: "📸" });
    } else {
      toast.warning("Bu şəkil artıq var!", { icon: "⚠️" });
    }
  };

  if (uLoading || pLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ minHeight: "100vh" }}>
      <header className="text-center mb-5">
        <h1 className="display-4 fw-black text-dark mb-2" style={{ letterSpacing: "-1px" }}>Recipes Manager</h1>
        <p className="text-muted fs-5">İstifadəçiləri və şəkilləri seçərək öz premium kolleksiyanı yarat</p>
      </header>

      <Row className="g-4">
        {/* --- İstifadəçilər Bölməsi --- */}
        <Col lg={6}>
          <div className="p-4 shadow-lg rounded-5 bg-white border-0 h-100" style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)" }}>
            <h4 className="mb-4 d-flex justify-content-between align-items-center fw-bold text-secondary">
              İstifadəçilər
              <Badge bg="dark" pill className="px-3">{users.length}</Badge>
            </h4>
            <Stack direction="vertical" gap={3}>
              {users.map((user) => {
                const isAdded = localDatas.find((i) => i.id === user.id);
                return (
                  <div key={user.id} 
                    className="d-flex justify-content-between align-items-center p-3 rounded-4 border bg-white shadow-sm transition-all"
                    style={{ 
                      transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer"
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="shadow-sm" style={{ 
                        width: "48px", height: "48px", background: "linear-gradient(135deg, #5DCAA5 0%, #3eb489 100%)", 
                        color: "white", borderRadius: "16px", display: "flex", 
                        alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "1.2rem"
                      }}>
                        {user.name[0]}
                      </div>
                      <div>
                        <div className="fw-bold" style={{ color: "#2d3436", fontSize: "15px" }}>{user.name}</div>
                        <small className="text-muted" style={{ fontSize: "12px" }}>{user.email}</small>
                      </div>
                    </div>
                    <Button 
                      variant={isAdded ? "success" : "primary"}
                      className="rounded-pill px-4 border-0 fw-bold shadow-sm"
                      style={{ 
                        fontSize: "12px", 
                        background: isAdded ? "#5DCAA5" : "linear-gradient(45deg, #007bff, #0056b3)"
                      }}
                      onClick={() => handleAddUser(user)}
                    >
                      {isAdded ? "✓ Added" : "+ Add"}
                    </Button>
                  </div>
                );
              })}
            </Stack>
          </div>
        </Col>

        {/* --- Şəkillər Bölməsi --- */}
        <Col lg={6}>
          <div className="p-4 shadow-lg rounded-5 bg-white border-0 h-100" style={{ background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)" }}>
            <h4 className="mb-4 d-flex justify-content-between align-items-center fw-bold text-secondary">
              Şəkillər
              <Badge bg="dark" pill className="px-3">{photos.length}</Badge>
            </h4>
            <Row className="g-3">
              {photos.map((photo) => {
                const isAdded = localImgs.find((i) => i.id === photo.id);
                const dynamicUrl = `https://i.pravatar.cc/150?u=${photo.id}`;

                return (
                  <Col xs={12} key={photo.id}>
                    <div className="d-flex justify-content-between align-items-center p-2 rounded-4 border bg-white shadow-sm transition-all"
                      style={{ transition: "0.3s ease" }}
                      onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                      onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <img 
                          src={dynamicUrl} 
                          alt="thumb" 
                          referrerPolicy="no-referrer"
                          className="shadow-sm"
                          style={{ width: "65px", height: "65px", objectFit: "cover", borderRadius: "18px", border: "3px solid #f8f9fa" }}
                        />
                        <div className="fw-medium text-dark text-truncate" style={{ maxWidth: "160px", fontSize: "13px" }}>
                          {photo.title}
                        </div>
                      </div>
                      <Button 
                        variant={isAdded ? "success" : "primary"}
                        className="rounded-pill px-4 border-0 fw-bold shadow-sm"
                        style={{ 
                          fontSize: "12px",
                          background: isAdded ? "#5DCAA5" : "linear-gradient(45deg, #6c757d, #343a40)"
                        }}
                        onClick={() => handleAddPhoto(photo, dynamicUrl)}
                      >
                        {isAdded ? "✓ Added" : "+ Add"}
                      </Button>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
      </Row>

      {/* --- Seçilmişlər Paneli (Final Premium) --- */}
      <section className="mt-5 p-5 rounded-5 border-0 shadow-lg text-dark" style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,249,250,0.9) 100%)",
        backdropFilter: "blur(20px)"
      }}>
        <div className="text-center mb-5">
            <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 mb-2 fw-bold">MY COLLECTION</span>
            <h2 className="fw-bold display-6 mb-0">Seçilmiş Elementlər</h2>
            <div style={{ width: "40px", height: "4px", background: "#007bff", margin: "15px auto", borderRadius: "10px" }}></div>
        </div>

        <Row className="g-5">
          <Col md={6} className="border-end border-light">
            <h6 className="text-uppercase text-primary fw-bold mb-4" style={{ letterSpacing: "1.5px", fontSize: "11px" }}>
               İSTİFADƏÇİLƏR ({localDatas.length})
            </h6>
            <div className="d-flex flex-wrap gap-2">
              {localDatas.map(u => (
                <div key={u.id} className="bg-white p-2 px-3 rounded-4 shadow-sm border-0 d-flex align-items-center gap-2">
                  <div style={{ width: "8px", height: "8px", background: "#5DCAA5", borderRadius: "50%" }}></div>
                  <span className="fw-bold" style={{ fontSize: "13px", color: "#444" }}>{u.name}</span>
                </div>
              ))}
            </div>
          </Col>

          <Col md={6}>
            <h6 className="text-uppercase text-primary fw-bold mb-4" style={{ letterSpacing: "1.5px", fontSize: "11px" }}>
               ŞƏKİLLƏR ({localImgs.length})
            </h6>
            <div className="d-flex flex-wrap gap-3">
              {localImgs.map(img => (
                <div key={img.id} className="position-relative">
                  <img 
                    src={img.thumbnailUrl} 
                    alt="sel" 
                    className="border border-4 border-white shadow" 
                    style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "22px" }}
                  />
                  <div className="position-absolute top-0 start-100 translate-middle bg-primary text-white rounded-circle d-flex align-items-center justify-content-center shadow-lg" 
                       style={{ width: "24px", height: "24px", fontSize: "10px", border: "2px solid white" }}>
                    ✓
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
}