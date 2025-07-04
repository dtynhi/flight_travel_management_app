import { FaAngleDown, FaPlus, FaRegClone, FaRegFileExcel, FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import {
  MdOutlineFilterAlt,
  MdOutlineFileDownload,
  MdOutlinePending,
  MdHistory,
  MdOutlineInventory2,
  MdOutlineStorefront,
  MdOutlineAnalytics
} from 'react-icons/md';
import { IoCheckmark, IoHomeOutline, IoSettingsOutline, IoShareSocialOutline, IoSync } from 'react-icons/io5';
import { FiAlertCircle, FiEdit } from 'react-icons/fi';
import { FaRegTrashCan } from 'react-icons/fa6';
import { CgSpinnerTwo } from 'react-icons/cg';
import { LiaClipboardListSolid } from 'react-icons/lia';
import { LuMailPlus, LuPackage } from 'react-icons/lu';
import { IoIosHelpCircleOutline, IoMdClose } from 'react-icons/io';
import { CiExport, CiImport, CiCircleCheck, CiWarning } from 'react-icons/ci';
import { AiOutlineProduct, AiOutlineRedo } from 'react-icons/ai';
import { GoOrganization, GoLinkExternal } from 'react-icons/go';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { HiOutlineViewfinderCircle } from 'react-icons/hi2';
import { PiCreditCard } from 'react-icons/pi';
import { TbBuildingAirport } from 'react-icons/tb';
import { FaUsers } from 'react-icons/fa6';
import { VscRequestChanges } from 'react-icons/vsc';

function AppIcon() {
  return <span>You have not select App Icon</span>;
}

// Gán các icon vào AppIcon như thuộc tính
AppIcon.Plane = FaPlaneDeparture;
AppIcon.Plus = FaPlus;
AppIcon.Filter = MdOutlineFilterAlt;
AppIcon.Sync = IoSync;
AppIcon.Edit = FiEdit;
AppIcon.Delete = FaRegTrashCan;
AppIcon.Clone = FaRegClone;
AppIcon.Download = MdOutlineFileDownload;
AppIcon.Loading = CgSpinnerTwo;
AppIcon.Home = IoHomeOutline;
AppIcon.Order = LiaClipboardListSolid;
AppIcon.List = LiaClipboardListSolid; // ✅ thêm dòng này để sửa lỗi
AppIcon.Listing = AiOutlineProduct;
AppIcon.Excel = FaRegFileExcel;
AppIcon.Product = LuPackage;
AppIcon.Setting = IoSettingsOutline;
AppIcon.Down = FaAngleDown;
AppIcon.Pending = MdOutlinePending;
AppIcon.Check = IoCheckmark;
AppIcon.Cancel = IoMdClose;
AppIcon.Help = IoIosHelpCircleOutline;
AppIcon.Export = CiExport;
AppIcon.Import = CiImport;
AppIcon.Invitation = LuMailPlus;
AppIcon.History = MdHistory;
AppIcon.Retry = AiOutlineRedo;
AppIcon.Organization = GoOrganization;
AppIcon.Report = HiOutlineDocumentReport;
AppIcon.Share = IoShareSocialOutline;
AppIcon.View = HiOutlineViewfinderCircle;
AppIcon.Finance = PiCreditCard;
AppIcon.Inventory = MdOutlineInventory2;
AppIcon.Shop = MdOutlineStorefront;
AppIcon.Link = GoLinkExternal;
AppIcon.Warning = CiWarning;
AppIcon.Alert = FiAlertCircle;
AppIcon.CheckCircle = CiCircleCheck;
AppIcon.Analytic = MdOutlineAnalytics;
AppIcon.Airport = FaPlaneArrival; 
AppIcon.Airport = TbBuildingAirport;
AppIcon.Employee = FaUsers;
AppIcon.Policy = VscRequestChanges;

export default AppIcon;
