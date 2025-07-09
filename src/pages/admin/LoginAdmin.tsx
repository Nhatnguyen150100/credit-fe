import { Input } from "antd";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import cookiesStore from "../../plugins/cookiesStore";
import { toast } from "react-toast";
import axiosRequest from "../../plugins/request";
import GeneralLoading from "../../components/GeneralLoading";
import DEFINE_ROUTER from "../../constants/router-define";
import { useDispatch } from "react-redux";
import { setAdminInfo } from "../../lib/reducer/adminSlice";

export default function LoginAdminPage() {
  const [form, setForm] = React.useState({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onHandleSubmit = async () => {
    if (!(form.userName && form.password)) {
      toast.error("Please enter user name and password");
      return;
    }
    try {
      setLoading(true);
      const rs = await axiosRequest.post("/v1/admin/login", {
        userName: form.userName,
        password: form.password,
      });
      cookiesStore.set("access_token", rs.data.data.accessToken);
      cookiesStore.set("admin", "admin");
      navigate(DEFINE_ROUTER.admin);
      dispatch(setAdminInfo(rs.data.data.user));
    } catch (error) {
      toast.error("Login failed. Please check your credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GeneralLoading isLoading={loading} />
      <div className="flex h-full w-full justify-center items-center">
        <section className="h-full">
          <div className="container h-full p-10">
            <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
              <div className="w-full">
                <div className="block rounded-lg bg-white shadow-lg dark:bg-blue-950">
                  <div className="g-0 lg:flex lg:flex-wrap">
                    <div className="px-4 md:px-0 lg:w-full">
                      <div className="md:mx-6 md:p-12">
                        {/* <!--Logo--> */}
                        <div className="text-center">
                          <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                            Admin of Check Vay
                          </h4>
                        </div>

                        <form>
                          <p className="mb-4">Please login to your account</p>
                          {/* <!--Username input--> */}
                          <Input
                            type="text"
                            placeholder="User name"
                            className="mb-4"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                onHandleSubmit();
                              }
                            }}
                            value={form.userName}
                            onChange={(e) => {
                              setForm((pre) => ({
                                ...pre,
                                userName: e.target.value,
                              }));
                            }}
                          ></Input>
                          <Input.Password
                            type="password"
                            placeholder="Password"
                            className="mb-4"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                onHandleSubmit();
                              }
                            }}
                            value={form.password}
                            onChange={(e: any) => {
                              setForm((pre) => ({
                                ...pre,
                                password: e.target.value,
                              }));
                            }}
                          ></Input.Password>
                          <div className="mb-12 pb-1 pt-1 text-center">
                            <button
                              disabled={loading}
                              className="mb-3 bg-pink-900 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-0px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="button"
                              onClick={() => onHandleSubmit()}
                            >
                              Đăng nhập
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
